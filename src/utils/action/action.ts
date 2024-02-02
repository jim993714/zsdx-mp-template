import type { ActionInfo } from './types';

const actions = new Map<string, ActionInfo>([
    // ['UJ', { type: 'link_outer', param: '', paramMap: { a: 'url' }, url: '', target: 'jump' }],
    // [
    //     'UW',
    //     { type: 'link_outer', param: '', paramMap: { a: 'url', b: 'target' }, url: '', target: '' }
    // ],
    // ['UA', { type: 'link_app_page', param: '', paramMap: { a: 'url' }, url: '', target: 'jump' }],
    [
        'UB',
        {
            type: 'link_wx',
            param: '',
            paramMap: { a: 'id', b: 'path', c: 'type' },
            name: '',
            target: 'miniprogram'
        }
    ], // 跳转小程序页面
    [
        'C3',
        {
            type: '',
            param: '',
            paramMap: { a: 'saleNo' },
            name: 'goodsDetailFlash',
            target: ''
        }
    ],
    ['C4', { type: '', param: '', paramMap: {}, name: 'seckillList', target: '' }],
    [
        'C7',
        {
            type: '',
            param: '',
            paramMap: { a: 'orderNo' },
            name: 'orderDetail',
            target: ''
        }
    ],
    [
        'C8',
        {
            type: '',
            param: '',
            paramMap: { a: 'orderNo' },
            name: 'logistics',
            target: ''
        }
    ],
    [
        'Cd',
        {
            type: '',
            param: '',
            paramMap: { a: 'lotteryNo' },
            name: 'lotteryGoodsDetail',
            target: ''
        }
    ],
    [
        'Cr',
        {
            type: '',
            param: '',
            paramMap: { a: 'applyNo' },
            name: 'orderAfterDetail',
            target: ''
        }
    ],
    [
        'Cs',
        {
            type: '',
            param: '',
            paramMap: { a: 'lotteryNo' },
            name: 'lottery',
            target: ''
        }
    ],
    [
        'D1',
        {
            type: '',
            param: '',
            extraParam: { tab: 3 },
            paramMap: {},
            name: 'message',
            target: ''
        }
    ],
    ['E4', { type: '', param: '', paramMap: {}, name: 'myAddress', target: '' }],
    ['E5', { type: '', param: '', paramMap: {}, name: 'myCollect', target: '' }],
    ['Ea', { type: '', param: '', paramMap: {}, name: 'studentAuth', target: '' }],
    ['Ed', { type: '', param: '', paramMap: {}, name: 'redpacket', target: '' }],
    [
        'Ei',
        {
            type: '',
            param: '',
            paramMap: { a: 'orderNos', b: 'money', c: 'from' },
            name: 'pay',
            target: ''
        }
    ],
    ['I6', { type: '', param: '', paramMap: { a: 'pageNo' }, name: 'customPage', target: '' }],
    ['Id', { type: '', param: '', paramMap: {}, name: 'myPrize', target: '' }],
    [
        'Ie',
        {
            type: '',
            param: '',
            paramMap: {},
            name: 'myPrize',
            target: ''
        }
    ],
    [
        'K1',
        {
            type: 'switchTab',
            param: '',
            paramMap: { a: 'studentShopId' },
            name: 'home',
            target: ''
        }
    ],
    [
        'K2',
        {
            type: '',
            param: '',
            paramMap: { a: 'studentShopId', b: 'goodsNo' },
            name: 'goodsDetail',
            target: ''
        }
    ],
    [
        'K14',
        {
            type: '',
            param: '',
            paramMap: {},
            name: 'companySubsidy',
            target: ''
        }
    ],
    [
        'K15',
        {
            type: '',
            param: '',
            paramMap: { a: 'activityNo' },
            name: 'pkZone',
            target: ''
        }
    ],
    [
        'K18',
        {
            type: '',
            param: '',
            paramMap: {},
            name: 'shoppingCashback',
            target: ''
        }
    ],
    [
        'K19',
        {
            type: '',
            param: '',
            paramMap: {},
            name: 'superSubsidy',
            target: ''
        }
    ],
    [
        'K20',
        {
            type: '',
            param: '',
            paramMap: {},
            name: 'newComerSpecial',
            target: ''
        }
    ],
    [
        'K22',
        {
            type: '',
            param: '',
            paramMap: {
                a: 'activityNo'
            },
            name: 'oneCentPurchase',
            target: ''
        }
    ],
    [
        'K23',
        {
            type: '',
            param: '',
            paramMap: {},
            name: 'campusGroup',
            target: ''
        }
    ],
    [
        'K24',
        {
            type: '',
            param: '',
            paramMap: {
                a: 'activityNo',
                b: 'schoolDumplingId',
                c: 'studentShopId'
            },
            name: 'campusGroupDetail',
            target: ''
        }
    ],
    [
        'K25',
        {
            type: '',
            param: '',
            paramMap: {
                a: 'activityNo'
            },
            name: 'discountArea',
            target: ''
        }
    ],
    [
        'K26',
        {
            type: '',
            param: '',
            paramMap: {
                a: 'shareKey',
                b: 'studentShopId'
            },
            name: 'exclusiveCoupon',
            target: ''
        }
    ],
    [
        'K27',
        {
            type: '',
            param: '',
            paramMap: {
                a: 'studentShopId',
                b: 'activityNo',
                c: 'goodsNo',
                d: 'timeId'
            },
            name: 'goodsDetailDiscount',
            target: ''
        }
    ],
    [
        'K4',
        {
            type: '',
            param: '',
            paramMap: {},
            name: 'combinationPackage',
            target: ''
        }
    ],
    [
        'K28',
        {
            type: '',
            param: '',
            paramMap: {
                a: 'coupon_no'
            },
            name: 'discountCouponGet',
            target: ''
        }
    ]
]);

export { actions };
