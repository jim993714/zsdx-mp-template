export interface UserInfo {
    /**
     * 是否绑定手机号
     */
    phoneBindStatus: 1 | 0;
    /**
     * 学生编号
     */
    studentNo: string;
    /**
     * 昵称
     */
    nickname: string;
    /**
     * 马赛克的手机号
     */
    maskedPhone: string;
    /**
     * 头像(缩略图)
     */
    headImg: string;
    /**
     * 头像(原图)
     */
    headImgOri: string;
    /**
     * 性别 1男 2女 0未知
     */
    gender: Gender;
    /**
     * 已确认的性别
     */
    genderChecked: 1 | 0;
    /**
     * 真实姓名
     */
    trueName: string;
    /**
     * 真实姓名（学生认真通过）
     */
    realName: string;
    /**
     * 出生日期
     */
    birthTime: number;
    /**
     * 出生省份编号
     */
    birthProvinceId: number;
    /**
     * 出生省份
     */
    birthProvince: string;
    /**
     * 出生城市编号
     */
    birthCityId: number;
    /**
     * 出生城市
     */
    birthCity: string;
    /**
     * 居住省份编号
     */
    residenceProvinceId: number;
    /**
     * 居住城市编号
     */
    residenceCityId: number;
    /**
     * 居住城市名称
     */
    residenceCityName: string;
    /**
     * 省份编号
     */
    provinceId: number;
    /**
     * 城市编号
     */
    cityId: number;
    /**
     * 学校编号
     */
    schoolId: number;
    /**
     * 学校名称
     */
    school: string;
    /**
     * 已确认学校
     */
    schoolChecked: 1 | 0;
    /**
     * 学院编号
     */
    schoolCollegeNo: string;
    /**
     * 学院名称
     */
    schoolCollege: string;
    /**
     * 班级
     */
    schoolClass: string;
    /**
     * 班级添加申请状态 0:待审核, 1:审核通过, -1:审核不通过, -2:未提交
     */
    schoolClassSubmitStatus: SchoolClassSubmitStatus;
    /**
     * 班级审核失败原因
     */
    schoolClassVerifyFailReason: string;
    /**
     * 是否显示班级
     */
    schoolClassShow: 1 | 0;
    /**
     * 学校区
     */
    schoolArea: string;
    /**
     * 专业
     */
    major: string;
    /**
     * 教育程度, 1:大专,2:本科,3:研究生,4:博士
     */
    educationLevel: EducationLevel;
    /**
     * 入学年份
     */
    enterSchoolYear: number;
    /**
     * 年制
     */
    maxGrade: number;
    /**
     * 个人简介
     */
    intro: string;
    /**
     * 个人简介语音地址
     */
    introVoice: string;
    /**
     * 学生证图片
     */
    studentCardImg: string;
    /**
     * 照片墙图片
     */
    photos: string[];
    /**
     * 背景图片
     */
    backgroundImg: string;
    /**
     * 掌大精英等级
     */
    stuagentLevel: number;
    /**
     * 掌大精英粉丝数
     */
    stuagentFansCount: number;
    /*
     * 标签
     */
    tagList: Tag[];
    /**
     * vip到期时间
     */
    vipEndTime: number;
    /**
     * 是否是内测用户
     */
    studentSuperIndex: 1 | 0;
    /**
     * 邀请码
     */
    inviteCode: string;
    /**
     * 校区审核状态 2:通过,1:审核中,0:未提交,-1:失败(v265
     */
    campusVerifyStatus: CampusVerifyStatus;
    /**
     * 学生认证方式 1:原身份认证,2:学信网,3消费者身份证,4消费者绿色(v265)
     */
    userAuthMethodType: UserAuthMethodType;
    /**
     * 认证状态 -2：未认证，-1：认证失败，0：待审核，1：认证通过(v265)
     */
    userVerify: UserVerify;
    /**
     *是否校内员工
     */
    schoolAgent: number;
    /**
     *	是否需要授权更新。 true：需要授权更新,false:不需要授权更新
     */
    needAuthUpdateBaseInfo: boolean;
}

export interface RootState {
    userInfo: any;
    token: String;
}

export enum Gender {
    /**
     * 未知
     */
    Unknown,
    /**
     * 男
     */
    Male,
    /**
     * 女
     */
    Female
}

export enum SchoolClassSubmitStatus {
    /**
     * 待审核
     */
    Pending = 0,
    /**
     * 审核通过
     */
    Pass = 1,
    /**
     * 审核不通过
     */
    Fail = -1,
    /**
     * 未提交
     */
    Unsubmit = -2
}

export enum EducationLevel {
    /**
     * 大专
     */
    JuniorCollege = 1,
    /**
     * 本科
     */
    Undergraduate,
    /**
     * 研究生
     */

    Graduate,
    /**
     * 博士
     */
    Doctor
}

export interface Tag {
    /**
     * 标签名称
     */
    tagName: string;
    /**
     * 标签编号
     */
    tagNo: number;
}

export enum UserVerify {
    /**
     * 未认证
     */
    Unverify = '-2',
    /**
     * 认证失败
     */
    Fail = '-1',
    /**
     * 待审核
     */
    Verifying = '0',
    /**
     * 认证通过
     */
    Pass = '1'
}

export enum CampusVerifyStatus {
    /**
     * 未提交
     */
    Unsubmit = '0',
    /**
     * 审核中
     */
    Verifying = '1',
    /**
     * 审核通过
     */
    Pass = '2',
    /**
     * 审核不通过
     */
    Fail = '-1'
}

export enum UserAuthMethodType {
    /**
     * 原身份认证
     */
    Original = 1,
    /**
     * 学信网
     */
    XueXin = 2,
    /**
     * 消费者身份证
     */
    ConsumerIdCard = 3,
    /**
     * 消费者绿色通道
     */
    ConsumerGreenChannel = 4
}

export interface UserStat {
    basic: BasicStat;
    order: OrderStat;
}

export interface BasicStat {
    /**
     * 红包卡券数量
     */
    couponCount: number;
    /**
     * 收藏订阅
     */
    collectGoodsCount: number;
    /**
     * 浏览足迹
     */
    historyGoodsCount: number;
}

export interface OrderStat {
    /**
     * 待付款
     */
    unPayCount: number;
    /**
     * 待发货
     */
    processCount: number;
    /**
     * 待收货
     */
    shipCount: number;
    /**
     * 退款/售后
     */
    afterSaleCount: number;
}
