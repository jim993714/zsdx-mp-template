import { router } from '@zsdx/mp-utils';

import type { IGridList } from '@/api/home/types';
import doAction from '@/utils/action/index';

import type { ITheme } from './type';

/** 主题色 */

export const theme: ITheme = {
    default: {
        background: 'https://cdn.zsdx.cn/mp-cs/images/home/default-head1.png',
        backgroundColor:
            'linear-gradient(315deg, #DFF1FF 0%, #F3FAFF 28%, #E7F9FF 39%, #D2EDFF 100%)',
        subScriptionBg: '#DFF3FF',
        color: '#199FFF',
        noticeBar: {
            color: '#199FFF',
            background: 'rgba(25, 159, 255, 0.1)'
        },
        newExclusive: {
            background: 'linear-gradient(180deg, #E6FBFF 0%, #CCEAFF 100%)',
            goodsItemBg: 'linear-gradient(135deg, #FFFFFF 0%, #199FFF 100%)',
            titleImg: 'https://cdn.zsdx.cn/mp-cs/images/home/default-newcomer-title1.png',
            couponImg: 'https://cdn.zsdx.cn/mp-cs/images/home/default-coupon-bg.png'
        },
        studentSloganBg: 'https://cdn.zsdx.cn/mp-cs/images/home/student-slogan-blue.png'
    },
    purple: {
        backgroundColor:
            'linear-gradient(315deg, #F5ECFF 0%, #F9F5FF 28%, #F3E4FF 39%, #E8DEFF 100%)',
        subScriptionBg: 'rgba(231, 217, 246, 1)',
        color: '#7F66FF',
        noticeBar: {
            color: '#7F66FF',
            background: 'rgba(127, 102, 255, 0.1)'
        },
        newExclusive: {
            background:
                'linear-gradient(180deg, rgba(201,127,255,0.1) 0%, rgba(127,102,255,0.5) 100%)',
            goodsItemBg: 'linear-gradient(135deg, #C980FF 0%, #7F66FF 100%)',
            titleImg: 'https://cdn.zsdx.cn/mp-cs/images/home/purple-newcomer-title.png',
            couponImg: 'https://cdn.zsdx.cn/mp-cs/images/home/purple-coupon-bg.png'
        },
        studentSloganBg: 'https://cdn.zsdx.cn/mp-cs/images/home/student-slogan-purple.png'
    },
    orange: {
        backgroundColor:
            'linear-gradient(315deg, #FBEACB 0%, #FBF4EA 28%, #FCEBD0 39%, #FBD7B7 100%)',
        subScriptionBg: 'rgba(243, 226, 195, 1)',
        color: '#FF8026',
        noticeBar: {
            color: '#FF8026',
            background: 'rgba(255, 128, 38, 0.1)'
        },
        newExclusive: {
            background:
                'linear-gradient(180deg, rgba(255,175,38,0.1) 0%, rgba(246,105,0,0.5) 100%)',
            goodsItemBg:
                'linear-gradient(180deg, rgba(255,175,38,0.1) 0%, rgba(246,105,0,0.5) 100%)',
            titleImg: 'https://cdn.zsdx.cn/mp-cs/images/home/orange-newcomer-title.png',
            couponImg: 'https://cdn.zsdx.cn/mp-cs/images/home/orange-coupon-bg.png'
        },
        studentSloganBg: 'https://cdn.zsdx.cn/mp-cs/images/home/student-slogan-orange.png'
    },
    green: {
        backgroundColor:
            'linear-gradient(315deg, #D8F9F8 0%, #F5FFFF 28%, #DBF5F3 39%, #BBF4F2 100%)',
        subScriptionBg: '#C3F2EC',
        color: '#13C4B7',
        noticeBar: {
            color: '#13C4B7',
            background: 'rgba(19, 196, 183, 0.1)'
        },
        newExclusive: {
            background:
                'linear-gradient(180deg, rgba(8,208,203,0.1) 0%, rgba(31,180,156,0.5) 100%)',
            goodsItemBg: 'linear-gradient(135deg, #FFFFFF 0%, #1FB49C 100%)',
            titleImg: 'https://cdn.zsdx.cn/mp-cs/images/home/green-newcomer-title.png',
            couponImg: 'https://cdn.zsdx.cn/mp-cs/images/home/green-coupon-bg.png'
        },
        studentSloganBg: 'https://cdn.zsdx.cn/mp-cs/images/home/student-slogan-green.png'
    },
    pk: {
        backgroundColor: 'linear-gradient(315deg, #1E9DFF 0%, #56B3FA 36%, #398FFE 100%)',
        subScriptionBg: '#D8EDFF',
        color: '#199FFF',
        noticeBar: {
            color: '#199FFF',
            background: 'rgba(25, 159, 255, 0.1)'
        },
        newExclusive: {
            background:
                'linear-gradient(180deg, rgba(8,208,203,0.1) 0%, rgba(31,180,156,0.5) 100%)',
            goodsItemBg: 'linear-gradient(135deg, #398FFE 0%, #199FFF 100%)',
            titleImg: 'https://cdn.zsdx.cn/mp-cs/images/home/pk-newcomer-title.png',
            couponImg: 'https://cdn.zsdx.cn/mp-cs/images/home/blue-coupon-bg.png',
            backgroundImage: 'https://cdn.zsdx.cn/mp-cs/images/home/pk-newcomer-bg.png'
        }
    },
    doubleEleven: {
        doubleElevenBorderColor: '#rgba(225, 91, 188, 1)',
        doubleElevenSearchColor: 'linear-gradient(135deg, #E15BBC 0%, #5C27D1 100%)',
        backgroundColor: 'linear-gradient(315deg, #E7BAE9 0%, #F7F3DF 49%, #C8BFFF 100%)',
        subScriptionBg: 'rgba(231, 220, 255, 1)',
        color: '#360F8E',
        noticeBar: {
            color: '#471793',
            background: 'rgba(127, 102, 255, 0.1)'
        },
        newExclusive: {
            color: '#9F58A4',
            background: 'linear-gradient(180deg, #E8D1E8 0%, #CAC0FD 100%)',
            goodsItemBg: 'linear-gradient(135deg, #E15BBC 0%, #5C27D1 100%)',
            titleImg: 'https://cdn.zsdx.cn/mp-cs/images/home/purple-newcomer-title.png',
            couponImg: 'https://cdn.zsdx.cn/mp-cs/images/home/double-eleven-coupon-bg.png'
        }
    }
};

/** 新人券领取状态文字 */
export const receiveFilterText = (status: number) => {
    switch (status) {
        case 1:
            return '点击领取';
        case 2:
            return '已领取';
        case 3:
            return '已领完';
    }
};

/** 宫格跳转 */

export const fnGoDetail = (list: IGridList) => {
    console.log(list.type, '宫格');
    switch (list.type) {
        case 1:
            router.push('superSubsidy');
            return;
        case 2:
            router.push('newArrivals');
            return;
        case 3:
            return;
        case 4:
            return;
        case 6:
            router.push('seckillList');
            return;
        case 10:
            doAction(list.appAction);
            return;
        default:
            return;
    }
};

/** 宫格title */
export const fnGetTitle = (type: number) => {
    switch (type) {
        case 1:
            return '超值补贴';
        case 2:
            return '新品专区';
        case 3:
            return '爆款跟买';
        case 4:
            return '校园团';
        case 5:
            return '组合包';
        case 6:
            return '秒杀';
        case 10:
            return '自定义页面';
        default:
            return '';
    }
};

/** 宫格头部颜色过滤 */

export const fnGetGridHeadBg = (type: number) => {
    switch (type) {
        case 1:
            return 'linear-gradient(180deg, #B3DFFF 0%, #FFFFFF 100%)';
        case 2:
            return 'linear-gradient(180deg, #D4CCFF 0%, #FFFFFF 100%)';
        case 3:
            return 'linear-gradient(180deg, #FFD2B3 0%, #FFFFFF 100%)';
        case 4:
            return 'linear-gradient(180deg, #A9E6F2 0%, #FFFFFF 100%)';
        case 6:
            return 'linear-gradient(180deg, #FFC5BF 0%, #FFFFFF 100%)';
        default:
            return '';
    }
};

export const loadingIcon =
    'data:image/gif;base64,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';
