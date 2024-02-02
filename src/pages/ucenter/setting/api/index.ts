import { useRequest } from '@zsdx/mp-utils';

import type {
    LogoffFinanceInfo,
    LogoffMobileParams,
    NewMobileParams,
    NewMobileVerifyParams,
    SetUserInfoParams,
    VerifyOldMobileParams
} from './types';

const request = useRequest();

/**
 * 修改用户信息
 */
export function setUserInfo(params: SetUserInfoParams) {
    return request.post('/student-school-shop/user/info/save', params);
}

/**
 * 获取旧手机号验证码
 */

export function verifyOldMobileCode() {
    return request.post('/student-school-shop/user/info/send/old/phone/verify');
}

/**
 * 验证旧手机验证码
 */
export function verifyOldMobile(params: VerifyOldMobileParams) {
    return request.post('/student-school-shop/user/info/phone/update/verify', params);
}

/**
 * 获取新手机验证码
 */
export function verifyNewMobileCode(params: NewMobileParams) {
    return request.post('/student-school-shop/user/info/send/new/phone/verify', params);
}

/**
 * 验证新手机验证码
 */
export function verifyNewMobile(params: NewMobileVerifyParams) {
    return request.post('/student-school-shop/user/info/phone/update', params);
}

/** 获取注销财务信息 */
export function getFinanceInfo() {
    return request.post<LogoffFinanceInfo>('/student-school-shop/finance/info');
}

/** 获取注销手机号验证码 */
export function logoffMobileCode() {
    return request.post('/student-school-shop/user/account/close/verify');
}

/**
 * 注销手机号
 */
export function logoffMobile(params: LogoffMobileParams) {
    return request.post('/student-school-shop/user/account/close', params);
}

/**
 * 退出登录
 */
export function logout() {
    return request.post('/student-school-shop/user/account/logout');
}

/** 获取关于我们 */
export function getAboutUs() {
    return request.post<{ aboutUsUrl: string }>('/student-school-shop/basic/setting/info');
}
