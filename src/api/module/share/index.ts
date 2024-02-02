import { useRequest } from '@zsdx/mp-utils';

import type { PwdRes } from './types';

const request = useRequest();

/**
 * 通过zsdxPwd读取分享信息
 */
export function getShareInfo(params: { zsdxPwd: string }) {
    return request.post('/student-school-shop/zsdxPwd/getContent', params);
}

/**
 * 获取分享码zsdxPwd
 * @returns zsdxPwd
 */
export function getZsdxPwd() {
    return request.post<PwdRes>('/student-school-shop/share/getZsdxPwdForInvite');
}
