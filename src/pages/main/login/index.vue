<script setup lang="ts">
import { router } from '@zsdx/mp-utils';

import { CDN_BASE_URL } from '@/base/constants';

import { login } from './api/index';
import type { LoginRes } from './api/types';
import AgreementBar from './components/agreement-bar.vue';
import LoginButton from './components/login-button.vue';
import { getWechatLoginCode, loginSuccess } from './utils';

const isChecked = ref(false);
const autoLoginInfo = ref<LoginRes>({
    userToken: '',
    newUser: 0
});

async function checkLogin(jsCode: string) {
    try {
        autoLoginInfo.value = await login(jsCode);
    } catch (error) {
        console.log(error);
    } finally {
        uni.hideLoading();
    }
}

async function onWxButtonTap() {
    if (!isChecked.value) {
        uni.showToast({
            title: '请阅读并同意《掌上大学隐私协议》',
            icon: 'none'
        });
        return;
    }
    if (!autoLoginInfo.value.userToken) return;

    const { userToken, newUser } = autoLoginInfo.value;

    loginSuccess(userToken, newUser === 1);
}

onMounted(async () => {
    uni.showLoading({
        title: '加载中...',
        mask: true
    });
    // 检查unionId是否存在, 如果存在, 则直接登录
    const jsCode = await getWechatLoginCode();

    // 检查unionId是否存在, 如果存在, 则直接登录
    await checkLogin(jsCode);
});
</script>

<template>
    <view class="login-page">
        <h1 class="logo">
            <image
                :src="`${CDN_BASE_URL}/mp-cs/images/login/login-logo.png`"
                class="logo-image"
                mode="aspectFit"
            />
        </h1>
        <view class="line" />
        <view class="desc"> 让全球在校大学生服务全球企业 </view>

        <view class="button-group">
            <LoginButton
                type="primary"
                :is-get-phone="isChecked && !autoLoginInfo.userToken"
                @click="onWxButtonTap"
            >
                手机号快捷登录
            </LoginButton>

            <view
                type="text"
                class="text-btn"
                @tap="router.push('phoneLogin')"
            >
                手机号码登录/注册
            </view>
        </view>

        <AgreementBar v-model="isChecked" />
    </view>
</template>

<style lang="scss" scoped>
.login-page {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    padding: 0 40rpx;

    .logo {
        margin-top: 200rpx;
        .logo-image {
            width: 372rpx;
            height: 80rpx;
        }
    }
    .line {
        width: 372rpx;
        height: 1px;
        margin: 20rpx 0;
        background-color: $uni-text-color-disable;
    }

    .desc {
        color: $uni-color-title;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 28rpx;
        letter-spacing: 8rpx;
    }

    .button-group {
        display: flex;
        margin-top: 200rpx;
        flex-direction: column;
        gap: 28rpx;

        .text-btn {
            text-align: center;
            color: #576066;
            font-size: 28rpx;
            font-weight: 400;
            background-color: #fff;
        }
    }
}
</style>
