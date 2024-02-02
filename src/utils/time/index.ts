import { slsTrack, storage, useRequest } from '@zsdx/mp-utils';

import { getSystemTime } from '@/api/common';
import { BASE_URL, EVN_BASE, MODE } from '@/base/constants';

//正式环境不使用调试页面切换的环境，否则使用调试页面切换的环境
const envVersion = uni.getAccountInfoSync().miniProgram.envVersion;

const localStorage = storage();

const { setParams } = useRequest();
const EVN: string = localStorage.get('EVN') || MODE;
const baseUrl = envVersion !== 'release' ? EVN_BASE[EVN] : BASE_URL;

slsTrack({
    host: 'cn-hangzhou.log.aliyuncs.com',
    project: 'zsdx-act',
    logstore: 'student-web-act',
    time: 15, // 发送日志的时间间隔，默认是10秒。
    count: 1, // 发送日志的数量大小，默认是10条。
    topic: 'topic', // 自定义日志主题。
    source: 'source',
    tags: {
        tags: 'tags'
    }
});
setParams({ baseUrl });
function useTime() {
    let time: number;

    getSystemTime().then(res => {
        time = Date.now() - res;
    });

    return function (date: number) {
        return time !== undefined ? date - time : time;
    };
}

export const getTime = useTime();
