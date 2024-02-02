<script setup lang="ts">
import doAction from '@/utils/action/index';

import type { IStudentPriceslogan } from '../api/types';

const props = defineProps<{
    info?: IStudentPriceslogan;
}>();

const goTo = () => {
    doAction(props.info?.appAction, { pageNo: props.info?.pageNo });
};
</script>

<template>
    <view
        class="slogan-warp"
        @tap.prevent="goTo"
    >
        <image
            class="slogan-icon"
            src="https://cdn.zsdx.cn/mp-cs/images/home/student-price-icon.png"
            mode="aspectFill"
        ></image>
        <view class="slogan-right">
            <image
                class="slogan-right-icon"
                :src="props.info?.firstIcon"
                mode="aspectFill"
            ></image>
            <view
                class="slogan-right-text"
                style="margin-right: 20rpx"
                >{{ props.info?.firstContent }}</view
            >
            <image
                class="slogan-right-icon"
                :src="props.info?.secondIcon"
                mode="aspectFill"
            ></image>
            <view class="slogan-right-text">{{ props.info?.secondContent }}</view>

            <zd-icon
                type="zdmp-qianwang"
                :size="24"
                color="#3d5464"
                class="zd-icon"
            ></zd-icon>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.slogan-warp {
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 750rpx;
    height: 40rpx;
    margin-top: 4rpx;
    padding: 0rpx 20rpx;
    flex-direction: row;
    box-sizing: border-box;
}

.slogan-icon {
    width: 102rpx;
    height: 28rpx;
}

.slogan-right {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.slogan-right-icon {
    width: 28rpx;
    height: 24rpx;
    margin-right: 4rpx;
}

.slogan-right-text {
    color: #3d5464;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 40rpx;
}

.slogan-right-font {
    margin-left: 10rpx;
    font-size: 24rpx;
}
.zd-icon {
    margin-bottom: 4rpx;
}
</style>
