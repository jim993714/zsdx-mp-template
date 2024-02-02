<script setup lang="ts">
import { router } from '@zsdx/mp-utils';

const props = defineProps<{
    title: string;
    icon: string;
    routeName: string;
    routeMethod?: Function;
}>();

function goto() {
    if (props.routeMethod) {
        return props.routeMethod?.();
    }
    router.push(props.routeName);
}
</script>

<template>
    <view
        class="service-item"
        @tap="goto"
    >
        <view class="service-item__icon">
            <image
                class="icon-image"
                :src="props.icon"
                mode="aspectFit"
            />
        </view>
        <view class="service-item__title">
            {{ props.title }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.service-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16rpx;
    &__icon {
        .icon-image {
            width: 56rpx;
            height: 56rpx;
        }
    }

    &__title {
        color: #292f33;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 24rpx;
    }
}
</style>
