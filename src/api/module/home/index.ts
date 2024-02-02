import { useRequest } from '@zsdx/mp-utils';

const request = useRequest();

/** 获取校园店前置Id */
export const getStudentShopId = () => {
    return request.post<string>('/student-school-shop/studentShop/getShopId');
};

/**
 * 查询校园店是否有效
 *  data: 0 无效， 1 是自己的校园店， 2 是别人的校园店
 */
export const checkStudentShopId = (studentShopId: string) => {
    return request.post<number>('/student-school-shop/studentShop/checkShopId', { studentShopId });
};
