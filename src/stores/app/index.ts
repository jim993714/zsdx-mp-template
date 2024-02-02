import { defineStore } from 'pinia';

import { useUserStore } from '../user';

export const useAppStore = defineStore('app', () => {
    const userStore = useUserStore();
    // 启动场景
    const scene = ref(0);
    // 购物车商品数量
    const shopCartCount = ref(0);

    function setScene(value: number) {
        scene.value = value;
    }

    async function updateShopCartCount() {
        if (!userStore.isLogin) {
            return;
        }
        const pages = getCurrentPages();

        shopCartCount.value = 0;

        if (pages.length) {
            const currentPage = pages[pages.length - 1];
            const tabbarPages = [
                'pages/main/home/index',
                'pages/main/shop-cart/index',
                'pages/main/mine/index'
            ];

            // 判断是否是tabbar页面
            if (tabbarPages.includes(currentPage.route as string)) {
                if (shopCartCount.value === 0) {
                    uni.removeTabBarBadge({
                        index: 1
                    });
                } else {
                    uni.setTabBarBadge({
                        index: 1,
                        text: shopCartCount.value.toString()
                    });
                }
            }
        }
    }

    return {
        scene,
        shopCartCount,
        updateShopCartCount,
        setScene
    };
});
