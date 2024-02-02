<script setup lang="ts">
import { router, storage } from '@zsdx/mp-utils';

import { getUserStatistic } from '@/api/module/user';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';

import BlockView from './components/block-view.vue';
import OrderItem from './components/order-item.vue';
import ServiceItem from './components/service-item.vue';
import StatItem from './components/stat-item.vue';
import UserInfo from './components/user-info.vue';
import { orderStatusList, serviceList, statList } from './constants';

const localStorage = storage();

const userStore = useUserStore();
const appStore = useAppStore();
const { isLogin, studentShopId } = toRefs(userStore);
const clientTop = uni.getWindowInfo().windowHeight / 2;
const filterServiceList = computed(() => {
    return serviceList;
});

async function getData() {
    const { basic, order } = await getUserStatistic();

    statList.value[0].count = basic.couponCount;
    statList.value[1].count = basic.collectGoodsCount;
    statList.value[2].count = basic.historyGoodsCount;

    orderStatusList.value[0].badge = order.unPayCount;
    orderStatusList.value[1].badge = order.processCount;
    orderStatusList.value[2].badge = order.shipCount;
    orderStatusList.value[3].badge = order.afterSaleCount;
}

function clearData() {
    statList.value.forEach(item => {
        item.count = 0;
    });
    orderStatusList.value.forEach(item => {
        item.badge = 0;
    });
}

onShow(() => {
    if (!isLogin.value) {
        clearData();
        return;
    }
    getData();
    userStore.updateUserInfo();
    appStore.updateShopCartCount();
});
</script>
<template>
    <view class="header">
        <zd-header />
        <UserInfo />

        <view class="stat-list">
            <StatItem
                v-for="item in statList"
                :key="item.title"
                v-bind="item"
            />
        </view>
    </view>
    <view class="page-wrap">
        <BlockView title="我的订单">
            <template #header-right>
                <view
                    class="all-order"
                    @tap="router.push('orderList', { status: 0 })"
                >
                    <text>全部订单</text>
                    <text class="arrow-right" />
                </view>
            </template>
            <view class="order-list">
                <order-item
                    v-for="item in orderStatusList"
                    :key="item.title"
                    v-bind="item"
                    @tap="router.push(item.routeName, item.routeParams)"
                />
            </view>
        </BlockView>

        <BlockView title="我的服务">
            <view class="service-list">
                <track-view
                    v-for="item in filterServiceList"
                    :key="item.routeName"
                    :track-data="{
                        type: 'all',
                        clientTop,
                        eventData: {
                            path: 'bi_event',
                            student_shop_id: localStorage.get('studentShopId'),
                            page_data_type: 'mine',
                            element_name: '我的服务Icon',
                            body_ext: {
                                service_name: item.routeName
                            }
                        }
                    }"
                >
                    <service-item v-bind="item" />
                </track-view>
            </view>
        </BlockView>
    </view>
</template>

<style lang="scss">
page {
    background-color: #f5f8fa;
}
</style>

<style lang="scss" scoped>
.header {
    position: relative;
    height: 408rpx;
    margin-bottom: 122rpx;
    background: url(https://nss1.zsdx.cn/mp-cs/images/ucenter/header-bg.png) no-repeat;
    background-size: cover;

    .bg-image {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 750rpx;
        height: 408rpx;
    }

    .stat-list {
        position: absolute;
        bottom: -72rpx;
        display: flex;
        justify-content: space-between;
        width: 750rpx;
        height: 88rpx;
        padding: 0 56rpx;
        box-sizing: border-box;
        background: rgba(0, 143, 249, 0);
    }
}

.page-wrap {
    padding: 0 20rpx 20rpx;

    .all-order {
        display: flex;
        align-items: center;
        color: $uni-color-paragraph;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 28rpx;
        gap: 8rpx;

        .arrow-right {
            width: 12rpx;
            height: 12rpx;
            border-top: 2rpx solid $uni-color-paragraph;
            border-right: 2rpx solid $uni-color-paragraph;
            transform: rotate(45deg);
        }
    }
    .order-list {
        display: flex;
        justify-content: space-between;
        padding: 0 24rpx;
    }

    .service-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 30rpx;
        padding: 0 10rpx;
    }
}
</style>
@/api/module/user
