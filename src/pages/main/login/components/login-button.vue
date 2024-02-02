<script setup lang="ts">
import { wxLogin } from '../api/index';
import { getWechatLoginCode, loginSuccess } from '../utils';

const props = defineProps<{
    type: 'primary' | 'default' | 'text';
    isGetPhone?: boolean;
    disabled?: boolean;
    backDelta?: number;
}>();
const emit = defineEmits<{
    (event: 'click'): void;
}>();

async function getPhoneNumber(event: any) {
    if (event.detail.errMsg !== 'getPhoneNumber:ok') {
        return;
    }

    uni.showLoading({
        title: '登录中...',
        mask: true
    });

    try {
        const jsCode = await getWechatLoginCode();
        const { userToken, newUser } = await wxLogin({
            code: event.detail.code,
            jsCode
        });

        uni.hideLoading();
        loginSuccess(userToken, newUser === 1, props.backDelta || 1);
    } catch (error) {
        uni.hideLoading();
        console.log(error);
    }
}
</script>

<template>
    <button
        :open-type="props.isGetPhone ? 'getPhoneNumber' : ''"
        class="custom-button"
        :class="[
            props.type === 'primary' ? 'custom-button-primary' : '',
            props.type === 'text' ? 'text-button' : '',
            props.disabled ? 'disabled' : ''
        ]"
        hover-class="none"
        :disabled="props.disabled"
        @getphonenumber="getPhoneNumber"
        @tap="emit('click')"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.custom-button {
    width: 670rpx;
    height: 80rpx;
    border: none;
    border: 2rpx solid $uni-color-paragraph;
    border-radius: 40rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 400;
    background-color: #fff;

    &::after {
        border: none;
    }

    &.custom-button-primary {
        border: none;
        color: #fff;
        background-color: $zd-main-color;
    }

    &.text-button {
        display: inline;
        width: auto;
        height: max-content;
        border: none;
        color: #576066;
        font-size: 28rpx;
        font-weight: 400;
        background-color: #fff;
    }

    &.disabled {
        opacity: 0.5;
    }
}
</style>
