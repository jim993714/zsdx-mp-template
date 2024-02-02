import { storage } from '@zsdx/mp-utils';
import { defineStore } from 'pinia';

import { checkStudentShopId, getStudentShopId } from '@/api/module/home';
import { getLoginStatus } from '@/api/module/login';
import { getZsdxPwd } from '@/api/module/share';
import { getUserInfo as getUserInfoRequest } from '@/api/module/user';
import type { UserInfo } from '@/api/module/user/types';
import { getStudentShopIdByZsdxPwd } from '@/utils/share/share';

const localStorage = storage();

export const useUserStore = defineStore('user', () => {
    const isLogin = ref(false);
    const userInfo = ref<UserInfo>();
    const getUserInfo = computed(() => userInfo.value);
    const studentShopId = ref('');
    const zsdxPwd = ref('');
    const zsdxPwdUsed = ref(false);
    const shareCode = ref('');
    const isVerify = ref(false);
    const isAgent = ref(false);
    function setUserInfo(info: UserInfo) {
        userInfo.value = info;
        isVerify.value = userInfo.value.userVerify >= '1';
        isAgent.value = userInfo.value.schoolAgent == 1;
        localStorage.set('isVerify', isVerify.value);
        localStorage.set('isAgent', isAgent.value);
        localStorage.set('uid', userInfo.value.studentNo);
    }

    async function updateLoginStatus() {
        try {
            const { loginStatus } = await getLoginStatus();

            isLogin.value = loginStatus === 1;
        } catch (error) {
            isLogin.value = false;
        }

        localStorage.set('isLogin', isLogin.value);
    }

    async function updateUserInfo() {
        if (!isLogin.value) return;
        const userInfo = await getUserInfoRequest();

        setUserInfo(userInfo);
    }

    async function updateStudentShopId() {
        // 存在zsdxPWd且未使用,直接解析其中的studengShopId
        if (zsdxPwd.value && zsdxPwdUsed.value === false) {
            zsdxPwdUsed.value = true;
            const codeStudentShopId = await getStudentShopIdByZsdxPwd(zsdxPwd.value);

            if (codeStudentShopId) {
                studentShopId.value = codeStudentShopId;
                localStorage.set('isShare', true);
                console.log('getShopId', codeStudentShopId);
            }
        }
        const code = await checkStudentShopId(studentShopId.value);
        if (localStorage.get('isShare')) {
            console.log('分享的', studentShopId.value);

            if (code === 0) {
                return (studentShopId.value = await getStudentShopId());
            }

            return studentShopId.value;
        } else {
            if (isLogin.value && userInfo.value?.schoolAgent === 1) {
                if (code === 0 || code == 2) {
                    return await getStudentShopId();
                }
            } else if (!userInfo.value?.schoolAgent) {
                if (code === 0) {
                    return await getStudentShopId();
                }
            }
            return studentShopId.value;
        }
    }
    /**
     * 获取分享zsdxPWd
     * @returns zsdxPwd:string
     */
    async function getShareZsdxPwd() {
        if (!isLogin.value) {
            return '';
        }
        if (shareCode.value) {
            return shareCode.value;
        }
        const data = await getZsdxPwd();
        shareCode.value = data.zsdxPwd;
        return data.zsdxPwd;
    }
    return {
        userInfo,
        getUserInfo,
        zsdxPwd,
        zsdxPwdUsed,
        updateUserInfo,
        setUserInfo,
        studentShopId,
        isLogin,
        updateLoginStatus,
        updateStudentShopId,
        getShareZsdxPwd
    };
});
