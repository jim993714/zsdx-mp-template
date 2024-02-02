<script setup lang="ts">
import { onLaunch, onShow } from '@dcloudio/uni-app';
import { clickTrack, storage } from '@zsdx/mp-utils';

import { generateRandomString } from '@/utils/tools/randomString';
import { registerUpdateManager } from '@/utils/update';

import { useAppStore } from './stores/app';
import { useUserStore } from './stores/user';
import { dealCopyUrl, jumpPageByZsdxPwd } from './utils/share/share';

const localStorage = storage();
const userStore = useUserStore();
const appStore = useAppStore();
const isHotRun = ref(true);
const { isLogin, userInfo, studentShopId, zsdxPwd, zsdxPwdUsed } = toRefs(userStore);

// 注册全局事件
function registerGlobalEvent() {
    // 跳转到首页
    uni.$on('goIndex', () => {
        uni.switchTab({
            url: '/pages/main/home/index'
        });
    });

    // 更新登录状态
    uni.$on('updateLogin', async () => {
        await userStore.updateLoginStatus();
    });
}

onLaunch(async (options: any) => {
    registerGlobalEvent();
    registerUpdateManager();

    // 更新登录状态
    await userStore.updateLoginStatus();
    // 如果已经登录, 则获取用户信息
    if (isLogin.value && !userInfo.value) {
        userStore.updateUserInfo();
    }
    let randomString = generateRandomString() + '' + new Date().getTime();
    localStorage.set('session_id', randomString);

    isHotRun.value = false;
});

onShow(async (options: any) => {
    appStore.setScene(options.scene);

    localStorage.set('from_channel', options.scene);

    // 小程序分享,保存参数中的zsdxPwd,下单时调用
    if (options.query.zsdxPwd) {
        zsdxPwd.value = options.query.zsdxPwd;
    } else {
        zsdxPwd.value = '';
    }
    // 扫码进入, 读取分享码内容
    // 分享进来的先判断校园店ID是否有效， 无效则获取推荐的校园店ID 并将校园店ID 存到本地
    // 不是分享进来的，判断校园店ID是否有效， 重新获取最新的studentShopId

    if (
        (options.scene === 1047 || options.scene === 1048 || options.scene === 1049) &&
        options.query.scene
    ) {
        console.log('扫app分享小程序码进入');
        zsdxPwd.value = options.query.scene;
        zsdxPwdUsed.value = false;
        // 解析zsdxpwd, 如果有跳转信息,直接跳转
        jumpPageByZsdxPwd(zsdxPwd.value);
    } else if (
        [1007, 1047, 1154, 1048, 1049, 1008, 1036, 1179, 1014, 1069].includes(options.scene)
    ) {
        localStorage.set('isShare', true);
        if (options.query?.studentShopId) {
            studentShopId.value = options.query?.studentShopId;
        } else {
            studentShopId.value = localStorage.get('studentShopId') || '';
        }
    } else {
        localStorage.set('isShare', false);
        studentShopId.value = localStorage.get('studentShopId') || '';
    }

    setTimeout(() => {
        let trackData = {
            type: 'click',
            eventData: {
                path: 'bi_active',
                student_shop_id: studentShopId.value,
                action: isHotRun.value ? 2 : 1,
                from_type: options.scene,
                page_time: new Date().getTime()
            }
        };
        clickTrack(trackData);
        isHotRun.value = true;
    }, 1000);
});

const watchLogin = async () => {
    studentShopId.value = await userStore.updateStudentShopId();
};

uni.$on('loginSuccess', watchLogin);

watch(
    () => studentShopId.value,
    () => {
        localStorage.set('studentShopId', studentShopId.value);
    }
);
dealCopyUrl();
</script>

<style lang="scss">
@import '/src/styles/iconfont.scss';
@import '/src/styles/common.scss';
@import '@zsdx/mp-material/dist/lib/assets/styles/BebasNeue-Regular.scss';
.track-client {
    position: fixed;
    top: 500rpx;
    left: 0;
    width: 750rpx;
    height: 20rpx;
    border: 1px solid red;
}
</style>
