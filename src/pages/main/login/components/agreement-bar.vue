<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { router } from '@zsdx/mp-utils';

import { CDN_BASE_URL } from '@/base/constants';

const props = defineProps<{
    modelValue?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
const isChecked = useVModel(props, 'modelValue', emit);

function handleRoute() {
    router.push('webview', {
        url: `${CDN_BASE_URL}/mp-cs/privacy-v2.html`
    });
}
</script>

<template>
    <view class="agreement">
        <zd-checkbox
            v-model="isChecked"
            :size="28"
        />
        <view class="agreement-text">
            选中代表您已经阅读并且同意<text
                class="agreement-link"
                @tap.stop="handleRoute"
                >《掌上大学隐私协议》</text
            >，如果您的手机号未注册掌上大学账户，登录时将为您自动注册。
        </view>
    </view>
</template>

<style lang="scss" scoped>
.agreement {
    display: flex;
    align-items: flex-start;
    margin-top: 40rpx;
    gap: 10rpx;

    &-text {
        color: $uni-color-paragraph;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 40rpx;
    }

    &-link {
        text-decoration: underline;
        color: $zd-main-color;
    }
}
</style>
