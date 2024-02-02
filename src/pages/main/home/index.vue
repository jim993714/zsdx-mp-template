<script setup lang="ts">
import { useLoadMore } from '@zsdx/mp-material/dist/lib/hooks/useLoadmore';
import { storage } from '@zsdx/mp-utils';

import { useAppStore } from '@/stores/app/index';
import { useUserStore } from '@/stores/user/index';

import { getCategoryList, getShopGoodsList, getShopInfo } from './api/index';
import type { ICategoryList, IShopGoodsListParams, IShopInfo } from './api/types';
import CategoryBar from './components/category-bar.vue';
import headerBar from './components/header-bar.vue';
import shopInfoPopup from './components/shopInfoPopup.vue';
import homeSkeleton from './components/skeleton.vue';
import waterfallWarp from './components/waterfall-warp.vue';
import { loadingIcon, theme } from './utils';

const userStore = useUserStore();
const { isLogin, userInfo } = toRefs(userStore);
const { studentShopId } = toRefs(userStore);
const {
    dataList: shopGoodsList,
    loadList,
    reload,
    loadText
} = useLoadMore(getShopGoodsList, list => list);
const pagePaddingTop = (uni.getSystemInfoSync().statusBarHeight || 0) + uni.upx2px(100);

const dataList = computed(() => shopGoodsList.value);
/** 基础信息 */
const shopInfo = ref<IShopInfo>();
/** 公告信息 */
const notice = ref<Array<string>>([]);

/** 是否显示骨架屏 */
const showNotice = ref(true);

/** 本店商品列表的传参 */
const goodsListParams = ref<IShopGoodsListParams>({
    studentShopId: '',
    sortType: '',
    sortField: ''
});
/** 分类列表 */
const categoryList = ref<Array<ICategoryList>>([]);
/** 显示用户信息 */
const showShopInfoPopup = ref(false);
/** 显示分类列表 */

const showCategoryPopup = ref(false);
/** 初始化 */
const init = ref(false);
/** 分类弹窗 */
const waterfallRef = ref();
const scrollInto = ref('');

/** 主题 */

const currentTheme = computed(() => {
    switch (shopInfo.value?.themeType) {
        case 1:
            return theme.default;
        case 2:
            return theme.purple;
        case 3:
            return theme.orange;
        case 4:
            return theme.green;
        case 5:
            return theme.pk;
        case 6:
            return theme.doubleEleven;
        default:
            return theme.default;
    }
});

/** 是否显示领券通知 */
const showCouponNotify = ref(false);

const saleLeadStudentCouponNo = ref('');
/** 是否授权头像 */
const showAuthCover = ref(false);

watch(
    () => goodsListParams.value,
    (val, oldVal) => {
        if (val !== oldVal) {
            reload(goodsListParams.value);
        }
    }
);

onLoad((options: any) => {
    /** 是否能使用grid view */
    if (!uni.canIUse('grid-view')) {
        uni.updateWeChatApp();
    }
    saleLeadStudentCouponNo.value = options.saleLeadStudentCouponNo || '';
});

onShow(async () => {
    try {
        const res = await userStore.updateStudentShopId();
        if (res) {
            studentShopId.value = res;
        }
        initData();
    } catch (err) {
        console.log(err);
    }

    if (isLogin.value) {
        useAppStore().updateShopCartCount();
    }
});

const upDateBaseInfo = () => {
    showAuthCover.value = true;
    uni.hideTabBar();
};
const initData = async () => {
    goodsListParams.value.studentShopId = studentShopId.value;
    if (studentShopId.value) {
        await fnInit(studentShopId.value);

        await fnInit2(studentShopId.value);

        if (userInfo?.value?.needAuthUpdateBaseInfo) {
            upDateBaseInfo();
        }
    }
};
const getShopShareInfo = (type: string) => {
    let imageUrl = dataList.value.length <= 0 ? '' : dataList.value[0].goodsCover;
    if (type === 'onShareAppMessage') {
        return {
            title: `${shopInfo.value?.shopName}，你的专属好物店铺~~享受全网最低、送货到寝、爆料送五折券福利`,
            path: '/pages/main/home/index?studentShopId=' + studentShopId.value,
            imageUrl: imageUrl
        };
    } else {
        return {
            title: `${shopInfo.value?.shopName}，你的专属好物店铺~~享受全网最低、送货到寝、爆料送五折券福利`,
            query: `studentShopId=${studentShopId.value}`,
            imageUrl: imageUrl
        };
    }
};
onShareAppMessage(() => {
    return getShopShareInfo('onShareAppMessage');
});
onShareTimeline(() => {
    return getShopShareInfo('onShareTimeline');
});
/** 初始化数据 */
const fnInit = async (studentShopId: string, refresh?: string) => {
    /** 判断是否有校园店ID 如果有直接获取店铺基础信息，没有则获取校园店ID 再获取店铺基础信息 并加店铺ID缓存到本地 */
    shopInfo.value = (await getShopInfo(studentShopId)) || {};

    /** 公告显示 */
    if (shopInfo.value.proclamationInfo) {
        notice.value.push(shopInfo.value.proclamationInfo.content);
    }
    init.value = true;

    /** 获取本店商品 */
    if (!refresh) {
        loadList(goodsListParams.value);
    }
};
const fnInit2 = async (studentShopId: string) => {
    /** 获取分类列表 */
    categoryList.value = (await getCategoryList(studentShopId)).list;
    categoryList.value.forEach((item, index) => {
        item.isActive = index === 0 ? true : false;
    });
};

/** 关闭公告 */
const closeNotice = () => {
    showNotice.value = false;
};
const fnSort = (item: ICategoryList, index: number) => {
    goodsListParams.value = {
        ...goodsListParams.value,
        categoryId: item.categoryId
    };
    scrollInto.value = 'item' + index;
};

/** 显示分类 */

const showCategory = (show: boolean) => {
    showCategoryPopup.value = show;
};

/** 下拉刷新 */

onPullDownRefresh(async () => {
    await fnInit(studentShopId.value, 'refresh');
    await fnInit2(studentShopId.value);
    goodsListParams.value = {
        ...goodsListParams.value,
        sortType: '',
        sortField: '',
        categoryId: ''
    };
    scrollInto.value = 'item0';
    uni.stopPullDownRefresh();
});

/** 加载 */

onReachBottom(async () => {
    await loadList(goodsListParams.value);
});
</script>

<template>
    <homeSkeleton v-if="!init" />

    <view
        v-else
        class="page-warp"
        :style="{ paddingTop: pagePaddingTop + 'px' }"
    >
        <view class="loading-box">
            <image
                class="loading-icon"
                :src="loadingIcon"
                mode="scaleToFill"
            />
        </view>
        <!-- 头部 -->
        <view
            class="page-head"
            :style="{ zIndex: showShopInfoPopup ? 99 : 101 }"
        >
            <header-bar
                :student-shop-id="studentShopId"
                :current-theme="currentTheme"
                :shop-info="shopInfo"
                @show-shop-info="showShopInfoPopup = true"
            ></header-bar>
        </view>
        <!-- 公告 -->
        <zd-notice-bar
            v-if="notice.length && showNotice"
            :color="currentTheme.noticeBar.color"
            :background="currentTheme.noticeBar.background"
            :content-list="notice"
            @close="closeNotice"
        ></zd-notice-bar>
        <waterfall-warp
            ref="waterfallRef"
            :list="dataList"
            :category-list="categoryList"
            :show-category-popup="showCategoryPopup"
            :scroll-into="scrollInto"
            :student-shop-id="studentShopId"
            @on-sort="fnSort"
            @show-category="showCategory"
        ></waterfall-warp>

        <view
            v-if="loadText && dataList.length"
            class="loadText"
        >
            {{ loadText }}
        </view>
    </view>
    <shop-info-popup
        :shop-info="shopInfo"
        :show="showShopInfoPopup"
        @close-shop-info-popup="showShopInfoPopup = false"
    ></shop-info-popup>
    <category-bar
        :show="showCategoryPopup"
        :category-list="categoryList"
        @close-category-bar="showCategory"
        @on-sort="fnSort"
    ></category-bar>
</template>

<style lang="scss" scoped>
.page-warp {
    display: flex;
    width: 750rpx;
    height: 100%;
    background: #f5f8fa;
    flex-direction: column;
}
.page-head {
    position: fixed;
    top: 0;
    left: 0;
}
.banner-warp {
    display: flex;
    justify-content: center;
    width: 750rpx;
    margin-top: 30rpx;
    flex-direction: row;
}

.loadText {
    width: 750rpx;
    height: 114rpx;
    text-align: center;
    color: $uni-color-paragraph;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 114rpx;
    background: #f5f8fa;
}

.recommend-box {
    overflow: hidden;
    width: 750rpx;
    background: #f5f8fa;
}
.loading-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 750rpx;
    height: 100rpx;
}
.loading-icon {
    width: 36rpx;
    height: 36rpx;
}
.recommend-top-set {
    width: 750rpx;
    background: #f5f8fa;
}
</style>
