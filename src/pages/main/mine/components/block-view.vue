<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <view class="block-view">
        <view class="block-view__header">
            <view class="title">
                {{ props.title }}
            </view>
            <view class="header-right">
                <slot name="header-right"></slot>
            </view>
        </view>
        <view class="block-view__content">
            <slot></slot>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.block-view {
    margin-bottom: 20rpx;
    padding: 30rpx 30rpx 40rpx;
    border-radius: 16rpx;
    background-color: #ffffff;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 36rpx;

        .title {
            color: #333333;
            font-size: 32rpx;
            font-weight: 500;
            line-height: 40rpx;
        }
    }
}
</style>
