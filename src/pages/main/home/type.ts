/** 主题配置类型 */

export interface IThemeConfig {
    background?: string;
    backgroundColor?: string;
    subScriptionBg: string;
    color: string;
    doubleElevenBorderColor?: string;
    doubleElevenSearchColor?: string;
    noticeBar: {
        color: string;
        background: string;
    };
    newExclusive: {
        background: string;
        goodsItemBg: string;
        titleImg: string;
        couponImg: string;
        backgroundImage?: string;
        color?: string;
    };
    studentSloganBg?: string;
}
/** 主题总配置 */
export interface ITheme {
    [key: string]: IThemeConfig;
}
