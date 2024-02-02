import { useRequest } from '@zsdx/mp-utils';

import type {
    ICategoryData,
    ICollectParams,
    IShopGoodsData,
    IShopGoodsListParams,
    IShopInfo
} from './types';

const request = useRequest();

/** 获取校园店基础信息 */
export const getShopInfo = (studentShopId: string) => {
    return request.post<IShopInfo>('/student-school-shop/studentShop/getShopInfo', {
        studentShopId
    });
};

/** 获取本店商品列表*/
export const getShopGoodsList = (params: IShopGoodsListParams) => {
    return request.post<IShopGoodsData>('/student-school-shop/studentShop/getGoodsList', params);
};

/** 订阅校园店*/

export const collectShop = (params: ICollectParams) => {
    return request.post('/student-school-shop/collect/collect', params);
};

/** 订阅校园商品分类列表*/

export const getCategoryList = (studentShopId: string) => {
    return request.post<ICategoryData>('/student-school-shop/studentShop/getCategoryList', {
        studentShopId
    });
};
