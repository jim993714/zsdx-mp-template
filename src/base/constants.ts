// 项目中的常量
//服务器接口地址
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const MODE: string = import.meta.env.VITE_MODE;
interface EVNTYPE {
    [key: string]: string;
}
// cdn host
// const CDN_BASE_URL = 'https://nss1.zsdx.cn'; //新
const CDN_BASE_URL = 'https://cdn.zsdx.cn'; //旧
const OPEN_MOCK = false;

const WEBVIEW_BASE_URL = import.meta.env.VITE_WEBVIEW_BASE_URL;

const EVN_BASE: EVNTYPE = {
    dev: 'https://zdms-student-dev.zsdx.cn/',
    pre: 'https://student-zdms-pre.zsdx.cn/',
    prod: 'https://student-zdms.zsdx.cn/',
    development: 'https://student-zdms-dev.zsdx.cn/',
    test: 'https://zdms-student-test.zsdx.cn/'
};
export { BASE_URL, CDN_BASE_URL, MODE, OPEN_MOCK, WEBVIEW_BASE_URL, EVN_BASE };
