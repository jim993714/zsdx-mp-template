<script setup lang="ts">
import { router } from '@zsdx/mp-utils';

import { bindInviteCode } from '../api/index';

const code = ref('');
const backDelta = ref(1);

async function submit() {
    try {
        await bindInviteCode(code.value);

        router.back({ delta: backDelta.value });
    } catch (e: any) {
        uni.showToast({
            title: e.msg,
            icon: 'none'
        });
    }
}

onLoad(options => {
    backDelta.value = +options?.backDelta || 1;
});
</script>

<template>
    <view class="page-wrap">
        <view class="title"> 请输入邀请码 </view>
        <view class="form">
            <input
                v-model="code"
                class="input"
                placeholder="请输入邀请码"
                placeholder-class="input-placeholder"
            />
        </view>
        <view class="btn-group">
            <zd-button
                type="primary"
                :disabled="!code"
                @tap="submit"
            >
                提交
            </zd-button>
            <view
                class="text"
                @tap="router.back({ delta: backDelta })"
            >
                跳过，直接进入
            </view>
        </view>
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

        .input {
            padding: 20rpx 0;
            border-bottom: 2rpx solid $uni-text-color-disable;
        }
    }

    .btn-group {
        display: flex;
        flex-direction: column;
        gap: 24rpx;
        margin-top: 178rpx;

        .text {
            text-align: center;
            color: #333333;
            font-size: 28rpx;
            font-weight: 400;
        }
    }
}
</style>
