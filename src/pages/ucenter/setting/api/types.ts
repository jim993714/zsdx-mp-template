/** 修改用户信息字段 */
export interface SetUserInfoParams {
    /** 头像 */
    headImg?: string;
    /** 昵称 */
    trueName?: string;
}

/** 旧手机号参数 */
export interface VerifyOldMobileParams {
    /** 验证码 */
    phoneVerifyCode: string;
}

/** 新手机获取验证码参数 */
export interface NewMobileParams {
    /** 手机号 */
    phone: string;
}

/** 新手机验证码校验参数 */
export interface NewMobileVerifyParams {
    /** 手机号 */
    phone: string;
    /** 验证码 */
    newPhoneVerifyCode: string;
}

export interface LogoffFinanceInfo {
    /** 可提现金额 */
    money: string;
    /** 待到账的金额 */
    totalWaitMoney: string;
}

export interface LogoffMobileParams {
    /** 注销验证码 */
    phoneVerifyCode: string;
    /** 注销原因 */
    deleteReason?: string;
}
