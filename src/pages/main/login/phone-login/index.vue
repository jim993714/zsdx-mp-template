<script setup lang="ts">
import { phoneLogin, phoneVerifyCode } from '../api/index';
import AgreementBar from '../components/agreement-bar.vue';
import LoginButton from '../components/login-button.vue';
import { getWechatLoginCode, loginSuccess } from '../utils';

const isChecked = ref(false);
const form = reactive({
    phone: '',
    code: ''
});

const isDisabled = computed(() => {
    return !form.phone || !form.code || form.phone.length < 11;
});

async function login() {
    if (!checkIsAgree()) {
        return;
    }
    try {
        uni.showLoading({
            title: '登录中...',
            mask: true
        });
        const jsCode = await getWechatLoginCode();
        const { userToken, newUser } = await phoneLogin({
            phone: form.phone,
            phoneVerifyCode: form.code,
            jsCode
        });

        uni.hideLoading();
        loginSuccess(userToken, newUser === 1, 2);
    } catch (error: any) {
        uni.hideLoading();
        uni.showToast({
            title: error.msg,
            icon: 'none'
        });
    }
}

async function request() {
    if (!form.phone) {
        uni.showToast({
            title: '请输入手机号',
            icon: 'none'
        });
        return Promise.reject();
    }
    try {
        await phoneVerifyCode(form.phone);
    } catch (error: any) {
        uni.showToast({
            title: error.msg,
            icon: 'none'
        });
        return Promise.reject();
    }
}

function checkIsAgree() {
    if (!isChecked.value) {
        uni.showToast({
            title: '请阅读并同意《掌上大学隐私协议》',
            icon: 'none'
        });
        return false;
    }

    return true;
}
</script>

<template>
    <view class="page-wrap">
        <view class="title"> 手机号登录/注册 </view>
        <view class="form">
            <zd-captcha
                v-model="form.phone"
                placeholder="输入手机号"
                no-cutdown
                focus
                prefix-icon="zdmp-shouji"
                maxlength="11"
                type="number"
                confirm-type="next"
            />
            <zd-captcha
                v-model="form.code"
                storage-key="login"
                :request="request"
                prefix-icon="zdmp-yanzhengma"
                type="number"
                confirm-type="done"
            />
        </view>
        <view class="btn-group">
            <zd-button
                :disabled="isDisabled"
                type="primary"
                @tap="login"
            >
                登录
            </zd-button>
            <LoginButton
                type="text"
                :back-delta="2"
                :is-get-phone="isChecked"
                class="wx-login-btn"
                @click="checkIsAgree"
            >
                微信登录
            </LoginButton>
        </view>

        <AgreementBar v-model="isChecked" />
    </view>
</template>

<style lang="scss" scoped>
.page-wrap {
    padding: 0 40rpx;

    .title {
        padding: 80rpx 0;
        color: #1d2023;
        font-size: 48rpx;
        font-weight: 500;
        line-height: 48rpx;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 48rpx;
    }

    .btn-group {
        display: flex;
        flex-direction: column;
        gap: 12rpx;
        margin-top: 60rpx;

        .wx-login-btn {
            text-align: center;
        }
    }
}
</style>
