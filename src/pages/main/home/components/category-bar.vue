<script setup lang="ts">
import type { ICategoryList } from '../api/types';

const categoryPopup = ref();
const props = defineProps<{
    show: Boolean;
    categoryList: Array<ICategoryList>;
}>();
const stickyTop = (uni.getSystemInfoSync().statusBarHeight || 0) + uni.upx2px(172);

watch(
    () => props.show,
    value => {
        if (value) {
            categoryPopup?.value.open('top');
        }
    }
);
const showCategory = (item: any) => {
    if (!item.show) {
        emit('closeCategoryBar', false);
    }
    if (item == 'close') {
        categoryPopup?.value.close();
    }
};
const onTab = (item: ICategoryList, index: number) => {
    props.categoryList.forEach(item => {
        item.isActive = false;
    });
    item.isActive = true;
    emit('onSort', item, index);
    categoryPopup?.value.close();
};
const emit = defineEmits(['closeCategoryBar', 'onSort']);
</script>

<template>
    <zd-popup
        ref="categoryPopup"
        :is-mask-click="true"
        :safe-area="true"
        @change="showCategory"
    >
        <view
            class="category-warp"
            :style="{ marginTop: stickyTop + 'px' }"
        >
            <view class="cate-box">
                <view
                    v-for="(item, index) in props.categoryList"
                    :id="'item' + index"
                    :key="index"
                    class="sort-item"
                    @tap.prevent="onTab(item, index)"
                >
                    <view
                        v-if="item.isActive"
                        class="sort-item-line"
                    ></view>
                    <text
                        :class="{
                            'sort-item-label': true,
                            'sort-item-label-active': item.isActive
                        }"
                        >{{ item.categoryName }}</text
                    >
                </view>
            </view>
            <view
                class="zdfont zdmp-shengxu icon-bottom"
                @tap.prevent="showCategory('close')"
            ></view>
        </view>
    </zd-popup>
</template>

<style lang="scss" scoped>
.category-warp {
    display: flex;
}

.cate-box {
    display: flex;
    overflow-y: scroll;
    width: 662rpx;
    height: 400rpx;
    padding-top: 20rpx;
    background: #f5f8fa;
    box-sizing: border-box;
    flex-wrap: wrap;
}

.icon-bottom {
    text-align: center;
    font-size: 24rpx;
    background: #f5f8fa;
    flex: 1;
    line-height: 80rpx;
}

.sort-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: flex-start;
    margin-left: 60rpx;
    flex-direction: column;
    flex-shrink: 0;
}

.sort-item-label {
    position: relative;
    text-align: center;
    color: #8a9399;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
}

.sort-item-label-active {
    color: #2c2c2c;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 28rpx;
}

.sort-item-line {
    position: absolute;
    bottom: 24rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 40rpx;
    height: 12rpx;
    border-radius: 8rpx;
    background: linear-gradient(135deg, #5ae4ff 0%, #199fff 100%);
}
</style>
