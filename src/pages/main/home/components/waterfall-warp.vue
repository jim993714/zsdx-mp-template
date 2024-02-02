<script lang="ts" setup>
import { clickTrack, restHadPush, storage } from '@zsdx/mp-utils';
import type { PropType } from 'vue';

import { useAppStore } from '@/stores/app';

import type { ICategoryList, IShopGoodsList } from '../api/types';
import goodsItem from './goods-item.vue';

const stickyTop = (uni.getSystemInfoSync().statusBarHeight || 0) + uni.upx2px(212);
const appStore = useAppStore();
const { scene } = toRefs(appStore);
const localStorage = storage();
const fromNavName = ref('');
const clientTop = uni.getWindowInfo().windowHeight / 2;
const trackData = {
    type: 'all',
    clientTop: 0
};
const singlePageStyle = computed(() => {
    if (scene.value !== 1154) return {};

    return {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: 'auto',
        justifyItems: 'center',
        gap: '10rpx'
    };
});

const props = defineProps({
    list: {
        type: Array as PropType<Array<IShopGoodsList>>,
        default() {
            return [];
        }
    },
    categoryList: {
        type: Array as PropType<Array<ICategoryList>>,
        default() {
            return [];
        }
    },
    showCategoryPopup: {
        type: Boolean,
        default: false
    },
    scrollInto: {
        type: String,
        default: ''
    },
    studentShopId: {
        type: String,
        default: ''
    }
});

watch(
    () => props.showCategoryPopup,
    value => {
        showAllCategory.value = value;
    }
);

const scrollLeft = ref(0);
const scrollIntoView = ref('');
let showAllCategory = ref(false);
const navName = ref('精选');
fromNavName.value = props.categoryList.length ? props.categoryList[0].categoryName : '';
const onTab = (item: ICategoryList, index: number) => {
    restHadPush();
    fromNavName.value = props.categoryList.find(item => item.isActive)?.categoryName || '';

    props.categoryList.forEach(item => {
        item.isActive = false;
    });

    navName.value = item.categoryName;

    scrollLeft.value = index * 60;
    item.isActive = true;
    let data = {
        type: 'click',
        eventData: {
            path: 'bi_event',
            student_shop_id: props.studentShopId,
            element_name: '导航栏切换',
            body_ext: {
                from_nav_name: fromNavName.value,
                nav_name: navName.value
            }
        }
    };

    clickTrack(data);
    emit('onSort', item, index);
};

const fnToggleShowAll = () => {
    showAllCategory.value = !showAllCategory.value;

    emit('showCategory', showAllCategory.value);
};
const emit = defineEmits(['onSort', 'showCategory']);
defineExpose({
    scrollIntoView
});
</script>

<template>
    <view class="page-warp">
        <view
            class="track-view"
            :style="{ top: stickyTop + 'px' }"
        >
            <track-view
                :track-data="{
                    type: 'exposure',
                    clientTop: clientTop,
                    observerName: '.tabView',
                    eventData: {
                        path: 'bi_event',
                        student_shop_id: localStorage.get('studentShopId'),
                        element_name: '导航栏切换'
                    }
                }"
            >
                <view class="category-warp">
                    <scroll-view
                        scroll-x
                        class="scroll-view"
                        :show-scrollbar="false"
                        :scroll-with-animation="true"
                        :enable-flex="true"
                        :scroll-left="scrollLeft"
                        :scroll-into-view="scrollInto"
                    >
                        <view
                            v-for="(item, index) in props.categoryList"
                            :key="item.categoryId"
                            class="tab-item"
                            @tap="onTab(item, index)"
                        >
                            <view class="sort-item">
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
                    </scroll-view>
                    <view
                        class="zdfont zdmp-jiangxu icon-bottom"
                        :class="{ 'icon-bottom-reverse': showAllCategory }"
                        @tap="fnToggleShowAll()"
                    ></view>
                </view>
            </track-view>
        </view>

        <view class="waterfall-box">
            <zd-empty
                v-if="!list.length"
                image="https://cdn.zsdx.cn/mp-cs/images/activity/newcomer-special/empty.png"
                :image-width="450"
                :image-height="250"
            >
                <template #description>
                    <text class="empty-text">商品正在马不停蹄的赶来~</text>
                </template>
            </zd-empty>
            <grid-view
                v-if="props.list.length"
                type="masonry"
                :cross-axis-count="2"
                :main-axis-gap="10"
                :cross-axis-gap="5"
                :style="singlePageStyle"
            >
                <view
                    v-for="(item, index) in props.list"
                    :key="item.goodsNo"
                >
                    <track-view
                        :track-data="{
                            ...trackData,
                            observerName: '.goods' + index,
                            eventData: {
                                path: 'bi_feeds',
                                student_shop_id: localStorage.get('studentShopId'),
                                nav_name: navName,
                                data_type: 'Goods',
                                data_id: item.goodsNo,
                                data_info: item,
                                index
                            }
                        }"
                    >
                        <goods-item
                            :item="item"
                            :index="index"
                        ></goods-item>
                    </track-view>
                </view>
            </grid-view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page-warp {
    width: 750rpx;
    background: #f5f8fa;
    box-sizing: border-box;
}
.track-view {
    position: sticky;
    left: 0;
    z-index: 99;
}
.category-warp {
    display: flex;
    align-items: center;
    width: 750rpx;
    background: #f5f8fa;
    .icon-bottom {
        padding-right: 20rpx;
        padding-left: 8rpx;
        font-size: 24rpx;
        line-height: 80rpx;
        &-reverse {
            transform: rotate(180deg);
            padding-right: 8rpx;
            padding-left: 20rpx;
        }
    }
}
.scroll-view {
    display: flex;
    overflow: hidden;
    width: 662rpx;
    height: 80rpx;
}

.tab-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
}
.sort-item {
    position: relative;
    display: flex;
    justify-content: center;
    margin-left: 60rpx;
    flex-direction: column;
    flex: 1;
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
    font-weight: 700;
    line-height: 28rpx;
}

.sort-item-line {
    position: absolute;
    bottom: 0rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 40rpx;
    height: 12rpx;
    border-radius: 8rpx;
    background: linear-gradient(135deg, #5ae4ff 0%, #199fff 100%);
}

.waterfall-box {
    width: 750rpx;
    padding: 10rpx;
    background: #f5f8fa;
    box-sizing: border-box;
}

.sort-top {
    color: #8a9399;
    font-size: 14rpx;
}
.sort-bottom {
    color: #8a9399;
    font-size: 14rpx;
}

.empty-text {
    text-align: center;
    color: $uni-text-color-placeholder;
    font-size: 28rpx;
}
</style>
