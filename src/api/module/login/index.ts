import { useRequest } from '@zsdx/mp-utils';

const request = useRequest();

/**
 * 获取登录状态
 */
export function getLoginStatus() {
    return request.post<{ loginStatus: 1 | 0 }>('/student-school-shop/user/info/login/status');
}
