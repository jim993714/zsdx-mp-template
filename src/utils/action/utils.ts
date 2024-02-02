import { actions } from './action';
import type { ParamMap } from './types';

const dealAction = (content: any) => {
    return new Promise((resolve, reject) => {
        content += ';';

        let type = '';
        const param: ParamMap = {};

        let strType = 0;
        let tempContent = '';
        let tempParamKey = '';
        for (let i = 0; i < content.length; i++) {
            switch (content[i]) {
                case '\\':
                    i++;
                    tempContent += content[i];
                    break;
                case ';':
                    console.log('match');
                    switch (strType) {
                        case 0:
                            type = tempContent;
                            tempContent = '';
                            strType = 1;
                            break;
                        case 2:
                            param[tempParamKey] = tempContent;
                            tempParamKey = '';
                            tempContent = '';
                            strType = 1;
                            break;
                    }
                    break;
                case '=':
                    tempParamKey = tempContent;
                    tempContent = '';
                    strType = 2;
                    break;
                default:
                    tempContent += content[i];
            }
        }
        if (type) {
            //异步加载action,防止资源浪费
            if (type == 'UE') {
                // getApp().globalData.post({
                //     url: '/student/Basic/getEventAppAction',
                //     data: {
                //         content: param.a
                //     },
                //     success: (resp: any) => {
                //         if (resp.code == 1) {
                //             // 将加载来的app_action进行解析
                //             dealAction(resp.data.app_action)
                //                 .then(resAction => {
                //                     resolve(resAction);
                //                 })
                //                 .catch(e => {
                //                     reject(e);
                //                 });
                //         } else {
                //             reject(resp.msg);
                //         }
                //     },
                //     fail: err => {
                //         console.log(err);
                //         reject('异步action获取异常');
                //     }
                // });
                uni.showToast({
                    title: '暂不支持',
                    icon: 'none'
                });
            } else {
                const action = actions.get(type);
                interface ActionParam {
                    [key: string]: any;
                }
                const actionParam: ActionParam = {};

                if (action) {
                    if (param) {
                        for (const k in param) {
                            if (action.paramMap[k]) {
                                actionParam[action.paramMap[k]] = param[k];
                            }
                        }
                        action.params = actionParam;
                    }
                    resolve(action);
                } else {
                    console.log('无匹配动作');
                    reject('无匹配动作');
                }
            }
        } else {
            console.log('无匹配内容');
            reject('无匹配内容');
        }
    });
};

export async function getActionResult(data: any, extParam?: any) {
    // 不兼容旧格式
    if (typeof data == 'object') {
        return {
            code: 0,
            msg: '暂不支持'
        };
    }
    try {
        const resultAction: any = await dealAction(data);

        console.log('getActionResult', resultAction);
        return {
            code: 1,
            action: resultAction,
            params: {
                ...resultAction.params,
                ...resultAction.extraParam,
                ...extParam
            }
        };
    } catch (e) {
        return {
            code: 0,
            msg: '暂无匹配操作'
        };
    }
}
