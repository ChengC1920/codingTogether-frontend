<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索帖子" @search="onSearch" />
        <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam" />
        <post-card-list :post-list="postList" />
        <van-empty v-if="postList?.length < 1" description="数据为空"/>
    </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import PostCardList from "../components/PostCardList.vue";

const active = ref('public')
const router = useRouter();
const searchText = ref('');

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
    // 查正常
    if (name === 'public') {
        listPost(searchText.value, 0);
    } else {
        // 查精华
        listPost(searchText.value, 1);
    }
}

// 跳转到创建队伍页
const toAddTeam = () => {
    router.push({
        path: "/discuss/add"
    })
}



const postList = ref([]);

/**
 * 搜索帖子
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listPost = async (val = '', status = 0) => {
    const res = await myAxios.get("/discuss/list", {
        params: {
            searchText: val,
            pageNum: 1,
            status,
        },
    });
    if (res?.code === 0) {
        postList.value = res.data;
    } else {
        Toast.fail('加载帖子失败，请刷新重试');
    }
}

// 页面加载时只触发一次
onMounted( () => {
    listPost();
})

const onSearch = (val) => {
    listPost(val);
};

</script>

<style scoped>
#teamPage {

}
</style>
