import { CDN_BASE_URL } from '@/base/constants';

/**
 * 个人统计信息
 */
export const statList = ref([
    {
        title: '红包卡券',
        count: 0,
        routeName: 'redpacket'
    },
    {
        title: '收藏订阅',
        count: 0,
        routeName: 'myCollect'
    },
    {
        title: '浏览足迹',
        count: 0,
        routeName: 'browsingHistory'
    }
]);

/**
 * 订单区域
 */
export const orderStatusList = ref([
    {
        title: '待付款',
        badge: 0,
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/order-pay.png`,
        routeName: 'orderList',
        routeParams: { status: 1 }
    },
    {
        title: '待发货',
        badge: 0,
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/order-send.png`,
        routeName: 'orderList',
        routeParams: { status: 5 }
    },
    {
        title: '待收货',
        badge: 0,
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/order-receive.png`,
        routeName: 'orderList',
        routeParams: { status: 3 }
    },
    {
        title: '退款/售后',
        badge: 0,
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/order-refund.png`,
        routeName: 'orderAfterList',
        routeParams: {}
    }
]);

/**
 * 服务区域
 */
export const serviceList = [
    {
        title: '学生认证',
        routeName: 'studentAuth',
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/student-auth.png`
    },
    {
        title: '官方客服',
        routeName: 'chatRoom',
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/official-service.png`
    },
    {
        title: '我的奖品',
        routeName: 'myPrize',
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/my-prize.png`
    },
    {
        title: '现金奖池',
        routeName: 'shoppingCashback',
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/cashback.png`
    },
    {
        title: '我的地址',
        routeName: 'myAddress',
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/my-address.png`
    },
    {
        title: '消息通知',
        routeName: 'message',
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/message.png`
    },
    {
        title: '设置',
        routeName: 'setting',
        icon: `${CDN_BASE_URL}/mp-cs/images/ucenter/setting.png`
    }
];
