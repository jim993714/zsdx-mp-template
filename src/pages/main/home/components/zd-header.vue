<script lang="ts" setup>
const statusBarHeight = ref(0);
const headerHeight = ref(0);
const props = defineProps({
    /** 背景色 */
    background: {
        type: String,
        default: ''
    }
});
uni.getSystemInfo({
    success(result) {
        statusBarHeight.value = result.statusBarHeight || 0;
        headerHeight.value = statusBarHeight.value + 44;

        console.log(result.statusBarHeight);
    }
});
</script>

<template>
    <view
        class="nav-header"
        :style="{
            height: headerHeight + 'px',
            paddingTop: statusBarHeight + 'px',
            background: props.background
        }"
    >
        <view class="nav-box">
            <view class="header-left">
                <slot name="left"></slot>
            </view>
            <view class="header-center">
                <view class="header-title"></view>
                <slot name="center"></slot>
            </view>
            <view class="header-right">
                <slot name="right"></slot>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.nav-header {
    width: 750rpx;
}
.nav-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    width: 556rpx;
    height: 88rpx;
}
.header-left {
    height: 88rpx;
}
.header-right {
    height: 88rpx;
}

.header-center {
    flex: 1;
    height: 88rpx;
}
.header-title {
    line-height: 88rpx;
}
</style>
