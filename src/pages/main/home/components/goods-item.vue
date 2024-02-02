<script setup lang="ts">
import { router } from '@zsdx/mp-utils';

import type { IShopGoodsList } from '../api/types';

const props = defineProps({
    item: {
        type: Object,
        default() {
            return {} as IShopGoodsList;
        }
    },
    index: {
        type: Number,
        default: 0
    }
});
const fnGoDetail = () => {
    router.push('goodsDetail', { goodsNo: props.item.goodsNo });
};

const getPrice = (type: string) => {
    if (type == 'price') {
        return props.item.goodsShowPrice;
    } else {
        return props.item.goodsShowOriginPrice;
    }
};

const getTextIndent = (item: any, goodsShowPriceType: number) => {
    if (!item.activityTagImg && goodsShowPriceType == 2) return '84rpx';
    let width = (item.width * 28) / item.height;

    if (!width) {
        return '0rpx';
    }
    return width + 8 + 'rpx';
};
</script>

<template>
    <view
        :class="`goods${props.index}`"
        class="goods-item"
        @tap="fnGoDetail()"
    >
        <image
            class="goods-item-cover"
            :src="props.item.goodsCover"
            mode="aspectFill"
        />
        <view
            v-if="item.maxSubsidy > 0 && item.subActivityType === 4"
            class="cashback-tag"
        >
            <image
                class="cashback-tag-bg"
                src="https://cdn.zsdx.cn/mp-cs/images/shop/cashback/cashback-pop.png"
            ></image>
            <text class="cashback-tag-text">最多返{{ item.maxSubsidy }}元</text>
        </view>
        <view class="goods-title-info">
            <image
                v-if="props.item.activityTagImg"
                class="goods-tag"
                :src="props.item.activityTagImg"
                mode="heightFix"
            />
            <image
                v-else-if="props.item.goodsShowPriceType == 2"
                class="goods-tag"
                src="https://cdn.zsdx.cn/mp-cs/images/home/student-price-red.png"
                mode="heightFix"
            />
            <text
                class="goods-title ellipsis2"
                :style="{
                    textIndent: getTextIndent(props.item, item.goodsShowPriceType)
                }"
                >{{ props.item.goodsTitle }}</text
            >
        </view>
        <view class="good-price-warp">
            <zd-price
                :value="getPrice('price')"
                :font-size-large="40"
                :font-size-small="28"
                :font-size-unit="20"
                :style="{ marginLeft: '20rpx' }"
            ></zd-price>
            <text
                v-if="props.item.goodsShowPrice != props.item.goodsShowOriginPrice"
                class="goods-price-line-num"
                >￥{{ getPrice('origin') }}</text
            >
        </view>
        <text
            v-if="props.item.recommendWords"
            class="goods-recommendation"
        >
            {{ props.item.recommendWords }}
        </text>
    </view>
</template>

<style lang="scss" scoped>
.goods-item {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    padding-bottom: 20rpx;
    border-radius: 12rpx;
    background: #ffffff;
    flex-direction: column;
    box-sizing: border-box;
    .goods-item-cover {
        width: 100%;
        height: 348rpx;
        margin-bottom: 20rpx;
    }
    .cashback-tag {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 156rpx;
        height: 36rpx;
        flex-direction: row;
        &-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 156rpx;
            height: 36rpx;
        }
        &-text {
            position: relative;
            padding-left: 8rpx;
            color: #a03c01;
            font-size: 20rpx;
            font-weight: 600;
            line-height: 28rpx;
        }
    }
    .discount-warp {
        position: absolute;
        top: 312rpx;
        left: 20rpx;
        padding: 12rpx 20rpx;
        border: 2rpx solid #ff8026;
        border-radius: 33rpx;
        color: #ff8026;
        font-size: 22rpx;
        font-weight: 400;
        background: rgba(255, 255, 255, 0.75);
        line-height: 32rpx;
    }
    .goods-title-info {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        .goods-tag {
            position: absolute;
            top: 6rpx;
            left: 20rpx;
            height: 28rpx;
        }
        .goods-title {
            margin-bottom: 20rpx;
            color: #333333;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
        }
    }

    .good-price-warp {
        display: flex;
        align-items: flex-end;
        width: 100%;
        flex-direction: row;
        border: 1px solid transparent;
    }
    .goods-price-label {
        margin-right: 6rpx;
        margin-left: 20rpx;
        color: #ff4734;
        font-size: 20rpx;
        font-weight: 500;
        line-height: 20rpx;
    }
    .goods-price-line-num {
        margin-left: 10rpx;
        text-decoration: line-through;
        color: #8a9399;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 20rpx;
    }
    .goods-recommendation {
        width: 308rpx;
        height: 36rpx;
        margin-top: 20rpx;
        border-radius: 4rpx;
        text-align: center;
        color: #ff8026;
        font-size: 20rpx;
        font-weight: 400;
        background: #fff9f5;
        line-height: 36rpx;
    }
}
</style>
