import { useRequest } from '@zsdx/mp-utils';

import type { UserInfo, UserStat } from './types';

const request = useRequest();

/**
 * 获取用户信息
 */
export function getUserInfo() {
    return request.post<UserInfo>('/student-school-shop/user/info/get');
}

/**
 * 获取用户统计
 */
export function getUserStatistic() {
    return request.post<UserStat>('/student-school-shop/user/info/statistic');
}
