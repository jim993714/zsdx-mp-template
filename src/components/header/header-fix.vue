<script setup lang="ts">
import { router } from '@zsdx/mp-utils';
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    background: {
        type: String,
        default: '#ffffff'
    },
    titleStyle: {
        type: Object,
        default() {
            return {};
        }
    },
    backIconColor: {
        type: String,
        default: '#333'
    }
});
const statusBarHeight = ref(0);

statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 0;
const back = () => {
    router.back();
};
</script>

<template>
    <view
        class="page-header-set"
        :style="{
            paddingTop: statusBarHeight + 'px',
            background: props.background
        }"
    >
        <view
            class="header-left"
            @tap.prevent="back"
        >
            <zd-icon
                type="zdmp-fanhui"
                :size="32"
                :color="props.backIconColor"
            ></zd-icon>
        </view>
        <view
            class="header-center"
            :style="props.titleStyle"
        >
            {{ props.title }}
        </view>
        <view class="header-right"></view>
    </view>
</template>

<style lang="scss" scoped>
.page-header-set {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    display: flex;
    width: 750rpx;
    height: 88rpx;
    background: #ffffff;
    .header-left,
    .header-right {
        width: 80rpx;
        height: 88rpx;
        padding-top: 20rpx;
        text-align: center;
    }
    .header-center {
        display: flex;
        justify-content: center;
        padding-top: 10rpx;
        color: #292f33;
        font-size: 36rpx;
        font-weight: 500;
        flex: 1;
    }
}
</style>
