<script setup lang="ts">
import { storage, useRequest } from '@zsdx/mp-utils';

import type { IEvn } from '../types';

const localStorage = storage();
const zdPopupRef = ref();
const { setParams } = useRequest();
const open = () => {
    zdPopupRef.value?.open();
};
const currentEvn = ref(localStorage.get('EVN') || 'dev');
const envList = ref<IEvn[]>([
    {
        label: '开发',
        baseUrl: 'https://zdms-student-dev.zsdx.cn/',
        mode: 'dev'
    },
    {
        label: '测试',
        baseUrl: 'https://zdms-student-test.zsdx.cn/',
        mode: 'test'
    },
    {
        label: '预发',
        baseUrl: 'https://student-zdms-pre.zsdx.cn/',
        mode: 'pre'
    },
    {
        label: '正式',
        baseUrl: 'https://student-zdms.zsdx.cn/',
        mode: 'prod'
    }
]);
const close = () => {
    zdPopupRef.value?.close();
};

const changeEvn = (item: any) => {
    currentEvn.value = item.mode;
    localStorage.set('EVN', item.mode);
    setParams({ baseUrl: item.baseUrl });
    emit('changeEvn', currentEvn.value);
    close();
};

const emit = defineEmits(['changeEvn']);
defineExpose({
    open,
    close
});
</script>

<template>
    <zd-popup
        ref="zdPopupRef"
        type="bottom"
    >
        <view class="main">
            <view class="head"> 请选择环境 </view>
            <view
                v-for="(item, index) in envList"
                :key="index"
                class="item"
                @tap.prevent="changeEvn(item)"
            >
                <view
                    class="item-label"
                    :class="{ active: item.mode === currentEvn }"
                    >{{ item.label }}</view
                >
                <view
                    class="zdfont zdmp-qianwang item-icon"
                    :class="{ active: item.mode === currentEvn }"
                ></view>
            </view>
        </view>
    </zd-popup>
</template>

<style lang="scss" scoped>
.main {
    width: 750rpx;
    height: 500rpx;
    border-radius: 28rpx 28rpx 0 0;
    background: #ffffff;
    .head {
        padding: 40rpx 0;
        border-bottom: 1rpx solid #f8f5f8;
        text-align: center;
        font-size: 28rpx;
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
