import { router } from '@zsdx/mp-utils';

import { getActionResult } from './utils';

const doAction = async (data: any, extParam?: any) => {
    const actionResult: any = await getActionResult(data, extParam);
    console.log(actionResult.action.type, 'actionResult');

    if (actionResult.code === 1) {
        if (actionResult.action.type === 'switchTab') {
            router.switchTab(actionResult.action.name, actionResult.params);
        } else if (actionResult.action.type === 'link_wx') {
            // 跳转微信操作
            // 跳转小程序页面, 本身跳转
            if (actionResult.action.params.id === 'gh_48942138f2e9') {
                let path = decodeURIComponent(actionResult.action.params.path);

                if (path.indexOf('?') < 0) {
                    path += '?';
                }
                router.push(path);
            } else {
                // 跳转其他小程序
                uni.navigateToMiniProgram({
                    appId: actionResult.action.params.id, //目标小程序的appid
                    path: decodeURIComponent(actionResult.action.params.path), //目标小程序的页面路径
                    fail: resp => {
                        console.log('打开失败', resp);
                    }
                });
            }
        } else {
            router.push(actionResult.action.name, actionResult.params);
        }
    } else {
        uni.showToast({
            title: actionResult?.msg || '暂不支持',
            icon: 'none',
            mask: true
        });
    }
};

export default doAction;
