<script setup lang="ts">
import { router } from '@zsdx/mp-utils';

const props = defineProps<{
    title: string;
    count: number;
    routeName: string;
}>();
</script>

<template>
    <view
        class="stat-item"
        @tap="router.push(props.routeName)"
    >
        <view class="stat-item__count"> {{ props.count }} </view>
        <view class="stat-item__title">
            {{ props.title }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.stat-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 176rpx;
    flex-direction: column;
    gap: 16rpx;
    background: rgba(0, 143, 249, 0);
    &__count {
        color: $uni-color-title;
        font-size: 48rpx;
        font-family: Bebas Neue;
        line-height: 48rpx;
    }

    &__title {
        color: $uni-color-paragraph;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 24rpx;
    }
}
</style>
