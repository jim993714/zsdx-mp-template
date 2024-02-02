<script setup lang="ts">
import { useUserStore } from '@/stores/user';

import { setUserInfo } from '../../api/index';

const nickname = ref('');
const popup = ref();

const { updateUserInfo } = useUserStore();

async function confirm() {
    try {
        await setUserInfo({
            trueName: nickname.value
        });
        updateUserInfo();
        uni.showToast({
            title: '修改成功'
        });
        popup.value.close();
    } catch (error: any) {
        uni.showToast({
            title: error.msg,
            icon: 'none'
        });
    }
}

function close() {
    popup.value.close();
}

defineExpose({
    open: (value: string) => {
        nickname.value = value;
        popup.value.open();
    }
});
</script>

<template>
    <zd-popup
        ref="popup"
        type="center"
    >
        <view class="nickname-dialog">
            <text class="nickname-dialog-title">修改昵称</text>
            <input
                v-model="nickname"
                maxlength="10"
                placeholder="请输入修改的昵称"
            />
            <view class="nickname-dialog-footer">
                <view @tap="close">取消</view>
                <view @tap="confirm">确定</view>
            </view>
        </view>
    </zd-popup>
</template>

<style scoped lang="scss">
.nickname-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600rpx;
    height: 350rpx;
    padding-top: 48rpx;
    border-radius: 22rpx;
    background: #fff;
    flex-direction: column;
    gap: 40rpx;
    box-sizing: border-box;

    &-title {
        color: $uni-color-title;
        font-size: 32rpx;
        font-weight: 500;
    }

    > input {
        width: 510rpx;
        padding: 16rpx;
        border: 2rpx solid #eee;
        border-radius: 8rpx;
        color: $uni-text-color;
        font-size: 28rpx;
        flex: unset;
    }

    &-footer {
        display: flex;
        align-items: center;
        width: 100%;
        border-top: 2rpx solid #eee;

        > view {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90rpx;
            color: $uni-text-color;
            font-size: 32rpx;
            flex: 1;
        }

        view:last-of-type {
            border-left: 2rpx solid #eee;
            color: $uni-color-primary;
        }
    }
}
</style>
@/api/module/user
