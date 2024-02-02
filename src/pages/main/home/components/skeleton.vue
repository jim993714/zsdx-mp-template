<script setup lang="ts">
const pagePaddingTop = (uni.getSystemInfoSync().statusBarHeight || 0) + uni.upx2px(172);
</script>

<template>
    <view
        class="page-warp"
        :style="{ paddingTop: pagePaddingTop + 'px' }"
    >
        <view
            class="page-head"
            :style="{ height: pagePaddingTop + 'px' }"
        >
            <view class="search-box"></view>
        </view>

        <view class="banner-warp">
            <view class="banner-item"></view>
        </view>

        <view class="new-comer-wrap">
            <view class="new-comer-item"></view>
            <view class="new-comer-item"></view>
            <view class="new-comer-item"></view>
        </view>

        <view class="grid-warp">
            <view class="grid-top">
                <view class="grid-top-left"> </view>
                <view class="grid-top-right">
                    <view
                        class="grid-top-right-item"
                        style="margin-bottom: 14rpx"
                    >
                        <view class="grid-goods-item"></view>
                        <view class="grid-goods-item"></view>
                    </view>
                    <view class="grid-top-right-item">
                        <view class="grid-goods-item"></view>
                        <view class="grid-goods-item"></view>
                    </view>
                </view>
            </view>
            <view class="grid-bottom">
                <view
                    class="grid-bottom-left"
                    style="margin-right: 14rpx"
                >
                    <view class="grid-goods-item"></view>
                    <view class="grid-goods-item"></view>
                </view>
                <view class="grid-bottom-right">
                    <view class="grid-goods-item"></view>
                    <view class="grid-goods-item"></view>
                </view>
            </view>
        </view>
        <view class="store-warp">
            <view class="store-item"></view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
@mixin animation {
    background: linear-gradient(
        90deg,
        rgb(242, 243, 245) 25%,
        rgb(229, 230, 235) 37%,
        rgb(242, 243, 245) 63%
    );
    background-size: 400% 100%;
    animation: skeleton-animation 1.5s cubic-bezier(0, 0, 1, 1) infinite;
}

.page-warp {
    display: flex;
    width: 750rpx;
    height: 100%;
    background: transparent;
    flex-direction: column;
}
.page-head {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 750rpx;
    background: #efefef;
    .search-box {
        width: 710rpx;
        height: 64rpx;
        margin-bottom: 10rpx;
        border-radius: 34rpx;
        background: #ffffff;
    }
}
.banner-warp {
    display: flex;
    justify-content: center;
    width: 750rpx;
    height: 240rpx;
    margin-top: 30rpx;
    flex-direction: row;
    .banner-item {
        width: 710rpx;
        height: 240rpx;
        border-radius: 16rpx;
        background: #efefef;

        @include animation;
    }
}

.new-comer-wrap {
    display: flex;
    justify-content: space-between;
    width: 710rpx;
    height: 364rpx;
    margin-top: 30rpx;
    margin-left: 20rpx;
    padding: 74rpx 18rpx 18rpx;
    border-radius: 16rpx;
    background: #efefef;
    flex-direction: row;
    box-sizing: border-box;

    @include animation;
    .new-comer-item {
        width: 212rpx;
        height: 268rpx;
        border: 2rpx solid #ffffff;
        border-radius: 32rpx;
    }
}

.grid-warp {
    width: 710rpx;
    margin-top: 30rpx;
    margin-left: 20rpx;
    .grid-top {
        display: flex;
        flex-direction: row;
        width: 710rpx;
        height: 590rpx;
        .grid-top-left {
            display: flex;
            width: 348rpx;
            height: 590rpx;
            margin-right: 14rpx;
            padding: 80rpx 20rpx 20rpx;
            border-radius: 16rpx;
            background: #efefef;
            flex-wrap: wrap;
            box-sizing: border-box;

            @include animation;
        }
        .grid-top-right {
            width: 348rpx;
        }
        .grid-top-right-item {
            display: flex;
            justify-content: space-between;
            width: 348rpx;
            height: 288rpx;
            padding: 80rpx 20rpx 20rpx;
            border-radius: 16rpx;
            background: #efefef;
            box-sizing: border-box;
            @include animation;
        }
    }
    .grid-bottom {
        display: flex;
        flex-direction: row;
        margin-top: 20rpx;
        .grid-bottom-left,
        .grid-bottom-right {
            display: flex;
            justify-content: space-between;
            width: 348rpx;
            height: 288rpx;
            padding: 80rpx 20rpx 20rpx;
            border-radius: 16rpx;
            background: #efefef;
            box-sizing: border-box;

            @include animation;
        }
    }
    .grid-goods-item {
        width: 144rpx;
        height: 144rpx;
        border: 1px solid #ffffff;
        border-radius: 8rpx;
    }
}

.store-warp {
    display: flex;
    justify-content: center;
    width: 750rpx;
    height: 360rpx;
    margin-top: 30rpx;
    .store-item {
        width: 710rpx;
        height: 360rpx;
        border-radius: 16rpx;
        background: #efefef;

        @include animation;
    }
}

@keyframes skeleton-animation {
    0% {
        background-position: 100% 50%;
    }

    to {
        background-position: 0 50%;
    }
}
</style>
