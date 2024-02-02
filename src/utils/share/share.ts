import { router, storage } from '@zsdx/mp-utils';

import { getShareInfo } from '@/api/module/share';

import { getActionResult } from '../action/utils';

function buildUrlOptions(options: any) {
    let res = '';

    for (const i in options) {
        res += i + '=' + (options[i] ? options[i] : '') + '&';
    }
    return res.substring(0, res.length - 1);
}

export async function getStudentShopIdByZsdxPwd(zsdxPwd: string) {
    try {
        const shareInfo: any = await getShareInfo({ zsdxPwd: zsdxPwd });
        console.log('getShareInfo', shareInfo);
        if (shareInfo?.type === 103) {
            const actionResult = await getActionResult(shareInfo.appAction);
            if (actionResult.code === 1 && actionResult.params.studentShopId) {
                return actionResult.params.studentShopId;
            }
        }
        return '';
    } catch (e) {
        console.log(e);
        return '';
    }
}
export async function jumpPageByZsdxPwd(zsdxPwd: string) {
    try {
        const shareInfo: any = await getShareInfo({ zsdxPwd: zsdxPwd });

        if (shareInfo?.type === 103) {
            const actionResult = await getActionResult(shareInfo.appAction);
            if (actionResult.code === 1) {
                if (actionResult.action.type === 'switchTab') {
                    router.switchTab(actionResult.action.name, actionResult.params);
                } else {
                    router.push(actionResult.action.name, actionResult.params);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * 处理复制链接, 添加studentShopId
 */
export function dealCopyUrl() {
    uni.onCopyUrl(() => {
        const currPages: any = getCurrentPages();
        console.log(currPages[currPages.length - 1]);
        const options: any = currPages[currPages.length - 1]?.options;
        if (options) {
            if (!options.studentShopId) {
                options.studentShopId = storage().get('studentShopId');
            }
            console.log({ query: buildUrlOptions(options) });
            return { query: buildUrlOptions(options) };
        }
        return { query: '' };
    });
}
