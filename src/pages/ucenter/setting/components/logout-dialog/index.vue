<script setup lang="ts">
const popup = ref();

async function confirm() {
    popup.value.close();
}

function close() {
    popup.value.close();
}

defineExpose({
    open: (value: string) => {
        popup.value.open();
    }
});
</script>

<template>
    <zd-popup
        ref="popup"
        type="center"
    >
        <view class="logout-dialog">
            <text class="logout-dialog-title">是否退出登录</text>
            <view class="logout-dialog-footer">
                <view @tap="close">取消</view>
                <view @tap="confirm">确定</view>
            </view>
        </view>
    </zd-popup>
</template>

<style scoped lang="scss">
.logout-dialog {
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
