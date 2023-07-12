<template>
    <template v-if="user">
        <van-cell title="当前用户" :value="user?.username" />
        <van-cell title="修改信息" is-link to="/user/update" />
        <van-cell title="我创建的队伍" is-link to="/user/team/create" />
        <van-cell title="我加入的队伍" is-link to="/user/team/join" />
        <van-form @submit="onLogout">
            <div>
                <van-button type="danger" style="position: absolute; top: 550px" size= "large" native-type="submit">退出登录</van-button>
            </div>
        </van-form>
    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, Toast} from "vant";
import {getCurrentUser} from "../services/user";
import {route} from "vant/es/composables/use-route";

const user = ref();

const router = useRouter();

onMounted(async () => {
    user.value = await getCurrentUser();
})

const onLogout = async () => {
    try {
        const res = await myAxios.post("/user/logout");
        if (res.code == 0) {
            localStorage.removeItem("user");
            showSuccessToast("退出登录成功");
            const redirectUrl = route.query?.redirect?? '/user/login';
            window.location.href = redirectUrl;
        } else {
            showFailToast("退出登录失败");
        }
    } catch (error) {
        console.error(error);
    }
};


const toEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/edit',
        query: {
            editKey,
            editName,
            currentValue,
        }
    })
}
</script>

<style scoped>

</style>
