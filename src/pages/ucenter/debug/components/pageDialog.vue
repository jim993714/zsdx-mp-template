<script setup lang="ts">
import { pages, subPackages } from '@/pages.json';

import type { pageItem, PagePaths, subPage } from '../types';

const zdPopupRef = ref();
const open = () => {
    zdPopupRef.value?.open();
};
const currentPage = ref('页面名称');

const pageNameList = computed(() => {
    let allPages = [...pages];
    let subPage: any = [];
    subPackages.forEach((acc: any) => {
        acc.pages.forEach((item: any) => {
            subPage.push({ ...item, path: `/${acc.root}/${item.path}` });
        });
    });
    allPages = [...pages, ...subPage];
    return allPages;
});

const close = () => {
    zdPopupRef.value?.close();
};

const changePage = (item: any) => {
    currentPage.value = item.style.navigationBarTitleText || item.pageName;
    console.log(item, 'item');

    emit('changePage', currentPage.value, item.path);
    close();
};

defineExpose({
    open
});
const emit = defineEmits(['changePage']);
</script>

<template>
    <zd-popup
        ref="zdPopupRef"
        type="bottom"
    >
        <view class="main">
            <view class="head"> 请选择页面名称 </view>
            <view class="item-warp">
                <view
                    v-for="(item, index) in pageNameList"
                    :key="index"
                    class="item"
                    @tap.prevent="changePage(item)"
                >
                    <view
                        class="item-label"
                        :class="{ active: item.pageName === currentPage }"
                        >{{ item.style?.navigationBarTitleText || item.pageName }}</view
                    >
                    <view
                        class="zdfont zdmp-qianwang item-icon"
                        :class="{ active: item.pageName === currentPage }"
                    ></view>
                </view>
            </view>
        </view>
    </zd-popup>
</template>

<style lang="scss" scoped>
.main {
    width: 750rpx;
    border-radius: 28rpx 28rpx 0 0;
    background: #ffffff;
    .head {
        padding: 40rpx 0;
        border-bottom: 1rpx solid #f8f5f8;
        text-align: center;
        font-size: 28rpx;
    }
    .item-warp {
        overflow-y: scroll;
        width: 750rpx;
        max-height: 950rpx;
    }
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        padding: 0 20rpx;
        border-bottom: 1rpx solid #f8f5f8;
    }
    .active {
        color: #f77234;
    }
    .icon {
        color: #333333;
    }
}
</style>
