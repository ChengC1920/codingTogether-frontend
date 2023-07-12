<template>
    <van-form @submit="onSubmit">
      <!-- 判断字段类型是否是性别 -->
      <template v-if="editUser.editKey === 'gender'">
        <van-cell :title="editUser.editName">
          <div class="gender-options">
            <van-radio v-model="editUser.currentValue" :name="1">男</van-radio>
            <van-radio v-model="editUser.currentValue" :name="0">女</van-radio>
          </div>
        </van-cell>
      </template>
      <template v-else>
        <van-field
            v-model="editUser.currentValue"
            :name="editUser.editKey"
            :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`"
        />
      </template>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import { ref } from "vue";
import myAxios from "../plugins/myAxios";
import { showSuccessToast, showFailToast } from 'vant';
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();

const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
})

const onSubmit = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        showFailToast('用户未登录');
        return;
    }

    console.log(currentUser, '当前用户')

    const res = await myAxios.post('/user/update', {
        'id': currentUser.id,
        [editUser.value.editKey as string]: editUser.value.currentValue,
    })
    console.log(res, '更新请求');
    if (res.code === 0 && res.data > 0) {
       showSuccessToast('修改成功');
        router.back();
    } else {
        showFailToast('修改错误');
    }
};

</script>

<style scoped>

.gender-options {
  display: flex;
  justify-content: space-between;
}

</style>
