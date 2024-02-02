<script setup lang="ts">
import { router, storage } from '@zsdx/mp-utils';

import evnDialog from './components/evnDialog.vue';
import pageDialog from './components/pageDialog.vue';

const localStorage = storage();
const evnDialogRef = ref();
const pageDialogRef = ref();
const studentShopId = ref(localStorage.get('studentShopId') || '');
const evnName = ref(localStorage.get('EVN') || 'dev');
const params = ref('');
const pageName = ref('页面名称');
const pageUrl = ref('');
const changeStudentShopId = () => {
    localStorage.set('studentShopId', studentShopId.value);
    uni.restartMiniProgram({
        path: '/pages/main/home/index'
    });
};

const changeEvn = () => {
    evnDialogRef.value?.open();
};

const changePageDialog = () => {
    pageDialogRef.value?.open();
};
const getCurrentEvn = (name: string) => {
    evnName.value = name;
    uni.restartMiniProgram({
        path: '/pages/main/home/index'
    });
};

const changePage = (name: string, page: string) => {
    pageName.value = name;
    pageUrl.value = page;
};

const goTo = () => {
    if (pageUrl.value) {
        router.push(`${pageUrl.value}?${params.value}`);
    } else {
        uni.showToast({
            title: '请选择页面',
            icon: 'none'
        });
    }
};
</script>

<template>
    <view class="page-warp">
        <view class="item">
            <view class="title">校园店切换</view>
            <input
                v-model="studentShopId"
                class="input"
                placeholder="请输入要更换的校园店id"
            />
            <zd-button
                class="btn"
                type="primary"
                @tap.prevent="changeStudentShopId"
                >切换当前校园店</zd-button
            >
        </view>
        <view class="item">
            <view class="title">环境切换</view>
            <view
                class="select"
                @tap.prevent="changeEvn"
            >
                <view class="select-label">请选择切换的环境</view>
                <view class="select-text">{{ evnName }}</view>
            </view>
        </view>

        <view class="item">
            <view class="title">跳转页面</view>
            <view
                class="select"
                @tap.prevent="changePageDialog"
            >
                <view class="select-label">选择页面</view>
                <view class="select-text">{{ pageName }}</view>
            </view>
            <input
                v-model="params"
                class="input"
                placeholder="页面参数"
            />
            <zd-button
                class="btn"
                type="primary"
                @tap.prevent="goTo"
                >跳转页面</zd-button
            >
        </view>
        <evn-dialog
            ref="evnDialogRef"
            @change-evn="getCurrentEvn"
        />
        <page-dialog
            ref="pageDialogRef"
            @change-page="changePage"
        ></page-dialog>
    </view>
</template>

<style lang="scss" scoped>
.page-warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;

    .item {
        display: flex;
        align-items: center;
        width: 100vw;
        padding: 20rpx;
        padding-bottom: 10rpx;
        border-bottom: 1rpx solid gray;
        flex-direction: column;
        box-sizing: border-box;
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20rpx;
            border-bottom: 1rpx solid red #f8f5f8;
        }
        .input {
            width: calc(100vw - 40rpx);
            min-height: 80rpx;
            margin-right: 20rpx;
            margin-bottom: 20rpx;
            margin-left: 20rpx;
            padding: 20rpx;
            background-color: #f0f0f0;
            box-sizing: border-box;
        }
        .btn {
            width: 100%;
            margin-top: 20rpx;
        }
        .select {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 20rpx;
        }
    }
}
</style>
