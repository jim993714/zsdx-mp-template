<script setup lang="ts">
const props = defineProps<{
    title: string;
    icon: string;
    badge?: number;
}>();
</script>

<template>
    <view class="order-item">
        <view class="order-item__icon">
            <image
                class="icon-image"
                :src="props.icon"
                mode="aspectFit"
            />
            <view
                v-if="props.badge"
                class="badge"
            >
                <uni-badge
                    :text="props.badge"
                    :custom-style="{ backgroundColor: '#FF4734' }"
                />
            </view>
        </view>
        <view class="order-item__title">
            {{ props.title }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.order-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12rpx;
    &__icon {
        position: relative;
        .icon-image {
            width: 68rpx;
            height: 68rpx;
        }

        .badge {
            position: absolute;
            top: -12rpx;
            right: -14rpx;
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
