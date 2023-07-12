<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="userAccount"
                name="userAccount"
                label="账号"
                placeholder="请输入账号"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="userPassword"
                type="password"
                name="userPassword"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            /><van-field
                v-model="checkPassword"
                type="password"
                name="checkPassword"
                label="确认密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            /><van-field
                v-model="planetCode"
                name="planetCode"
                label="编号"
                placeholder="请输入编号"
                :rules="[{ required: true, message: '请填写编号' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">

import myAxios from "../plugins/myAxios.ts";
import { showSuccessToast, showFailToast } from 'vant';
import {ref} from "vue";
import {useRouter} from "vue-router";
import {route} from "vant/es/composables/use-route";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');

const onSubmit = async () => {
    // console.log("用户登录");
    const res = await myAxios.post("/user/register", {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
        checkPassword: checkPassword.value,
        planetCode: planetCode.value,
    });
    if (res.code == 0 && res.data != null) {
        showSuccessToast("注册成功");
        const redirectUrl = route.query?.redirect?? '/user/login';
        window.location.href = redirectUrl;
    } else {
       showFailToast("注册失败");
    }
};

</script>

<style scoped>

</style>