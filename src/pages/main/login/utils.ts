import { router } from '@zsdx/mp-utils';

import { useUserStore } from '@/stores/user';
import { setToken } from '@/utils/auth';

export function getWechatLoginCode(): Promise<string> {
    return new Promise((resolve, reject) => {
        uni.login({
            success: res => {
                if (res.code) {
                    resolve(res.code);
                } else {
                    reject(res);
                }
            },
            fail: (err: any) => {
                reject(err);
            }
        });
    });
}

export async function loginSuccess(token: string, newUser: boolean, backDelta = 1) {
    const userStore = useUserStore();

    // 保存 token
    setToken(token);
    await userStore.updateLoginStatus();
    await userStore.updateUserInfo();

    uni.$emit('loginSuccess');
    // 跳转页面 1.新用户跳转到邀请码页面 2.老用户跳转到首页
    if (newUser) {
        router.redirect('inviteCode', {
            backDelta
        });
    } else {
        await uni.navigateBack({ delta: backDelta });
        uni.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
        });
    }
}
