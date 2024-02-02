<script lang="ts" setup>
import { router } from '@zsdx/mp-utils';
import type { PropType } from 'vue';

import { generateTrackSearchSession } from '@/utils/track/search';

import { collectShop } from '../api/index';
import type { ICollectParams, IShopInfo } from '../api/types';
import type { IThemeConfig } from '../type';
import slogan from './slogan.vue';

const props = defineProps({
    currentTheme: {
        type: Object as PropType<IThemeConfig>,
        default() {
            return {};
        }
    },
    shopInfo: {
        type: Object as PropType<IShopInfo>,
        default() {
            return {};
        }
    },
    studentShopId: {
        type: String,
        default: ''
    }
});
const searchSession = generateTrackSearchSession();
const isDoubleEleven = computed(() => {
    return props.shopInfo?.themeType === 6;
});
const collectStatus = ref(0);
const params = ref<ICollectParams>({
    studentShopId: '',
    type: 2,
    collectStatus: collectStatus.value
});

const isAndroid = uni.getSystemInfoSync().platform === 'android';
watch(
    () => props.shopInfo.isCollect,
    value => {
        collectStatus.value = value;
    },
    { immediate: true }
);

watch(
    () => props.studentShopId,
    value => {
        params.value.studentShopId = value;
    },
    { immediate: true }
);

const goSearch = () => {
    router.push('search', {
        studentShopId: props.studentShopId,
        __trackSearchSession: searchSession
    });
};
const collect = async () => {
    params.value.collectStatus = props.shopInfo.isCollect === 1 ? 0 : 1;

    await collectShop(params.value);
    collectStatus.value = collectStatus.value === 1 ? 0 : 1;
    uni.showToast({
        title: '操作成功',
        icon: 'none'
    });
};

const showShop = () => {
    emit('showShopInfo');
};
const emit = defineEmits(['showShopInfo']);
</script>
<template>
    <zd-header
        :height="220"
        :capsule="true"
        :background="props.currentTheme.backgroundColor"
    >
        <template #left>
            <view
                class="header-left"
                @tap.prevent="showShop"
            >
                <image
                    :src="props.shopInfo.shopLogo"
                    class="shop-log"
                    mode="scaleToFill"
                />
                <text class="header-title ellipsis">{{ props.shopInfo?.shopName }}</text>
            </view>
        </template>
        <template #right>
            <track-view
                :track-data="{
                    type: 'click',
                    eventData: {
                        path: 'bi_event',
                        student_shop_id: props.studentShopId,
                        element_name: '订阅店铺按钮',
                        body_ext: {
                            subscribe_type: collectStatus ? '取消订阅' : '订阅'
                        }
                    }
                }"
            >
                <view
                    class="header-right"
                    :style="{ marginRight: isAndroid ? '10rpx' : '' }"
                    @tap="collect"
                >
                    <text
                        class="header-right-text"
                        :style="{
                            color: currentTheme.color,
                            background: currentTheme.subScriptionBg
                        }"
                        >{{ collectStatus ? '已订阅' : '订阅' }}</text
                    >
                </view>
            </track-view>
        </template>
        <template #header-bottom>
            <track-view
                :track-data="{
                    type: 'click',
                    eventData: {
                        path: 'bi_search',
                        search_session: searchSession,
                        student_shop_id: studentShopId
                    },
                    clickData: {
                        action: 1
                    }
                }"
            >
                <view
                    class="header-search"
                    @tap="goSearch"
                >
                    <view
                        class="header-search-warp"
                        :class="{ 'search-border': isDoubleEleven }"
                    >
                        <view
                            placeholder-class="input-placeholder"
                            class="header-search-input"
                            confirm-type="search"
                            placeholder="请输入"
                        >
                            搜索
                        </view>
                        <text
                            class="header-search-btn"
                            :style="{
                                background: isDoubleEleven
                                    ? currentTheme.doubleElevenSearchColor
                                    : currentTheme.color
                            }"
                            >搜索</text
                        >
                    </view>
                </view>
            </track-view>
            <slogan :info="props.shopInfo?.studentPriceslogan"></slogan>
        </template>
    </zd-header>
</template>
<style lang="scss" scoped>
.header-left {
    display: flex;
    align-items: center;
    width: 400rpx;
    margin-top: 16rpx;
    padding-left: 20rpx;
    flex-direction: row;
    .shop-log {
        width: 56rpx;
        height: 56rpx;
        margin-right: 10rpx;
        border-radius: 50%;
    }
    .header-title {
        color: #292f33;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 40rpx;
    }
    .header-subtitle {
        margin-top: 8rpx;
        color: #576066;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 20rpx;
    }
}
.header-right {
    margin-top: 28rpx;
    flex-direction: row;
    .header-right-text {
        margin-top: 50rpx;
        padding: 6rpx 20rpx;
        border-radius: 24rpx;
        font-size: 24rpx;
        font-weight: 400;
    }
}

.header-search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 750rpx;
    height: 84rpx;
    flex-direction: row;
}

.header-search-warp {
    position: relative;
    display: flex;
    align-items: center;
    width: 710rpx;
    height: 64rpx;
    border-radius: 34rpx;
    background-color: #ffffff;
    flex-direction: row;
}
.search-border {
    border: 2rpx solid rgba(225, 91, 188, 1);
}
.header-search-btn {
    width: 112rpx;
    height: 56rpx;
    margin-right: 4rpx;
    border-radius: 28rpx;
    text-align: center;
    color: #ffffff;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 56rpx;
}
.header-search-input {
    width: 594rpx;
    height: 64rpx;
    padding-left: 30rpx;
    color: #8a9399;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 64rpx;
}
</style>
