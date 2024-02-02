import { useRequest } from '@zsdx/mp-utils';

import type { LoginRes } from './types';

const request = useRequest();

/**
 * 检查是否授权直接登录
 */
export function login(jsCode: string) {
    return request.post<LoginRes>('/student-school-shop/user/account/login/miniprogram/login', {
        jsCode
    });
}

/**
 * 微信手机号登录
 */
export function wxLogin(params: { code: string; jsCode: string }) {
    return request.post<LoginRes>(
        '/student-school-shop/user/account/login/miniprogram/registerAndBind',
        params
    );
}

/**
 * 手机号验证码登录
 */
export function phoneLogin(params: { phone: string; phoneVerifyCode: string; jsCode: string }) {
    return request.post<LoginRes>('/student-school-shop/user/account/login/phone/login', params);
}

/**
 * 获取登录手机验证码
 */
export function phoneVerifyCode(phone: string) {
    return request.post('/student-school-shop/user/account/login/phone/verify', { phone });
}

/**
 * 判断邀请码
 */
export function checkInviteCode(inviteCode: string) {
    return request.post<{ result: 1 | 0 }>('/student-school-shop/user/invitecode/check', {
        inviteCode
    });
}

/**
 * 绑定邀请码
 */
export function bindInviteCode(inviteCode: string) {
    return request.post('/student-school-shop/user/invitecode/bind', { inviteCode });
}
