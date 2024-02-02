<script setup lang="ts">
import { router } from '@zsdx/mp-utils';
import { storeToRefs } from 'pinia';

import { uploadImage } from '@/api/common';
import { useUserStore } from '@/stores/user/index';
import { clearToken } from '@/utils/auth';

import { logout as _logout, setUserInfo } from './api/index';
import NicknameDialog from './components/nickname-dialog/index.vue';

const envVersion = uni.getAccountInfoSync().miniProgram.envVersion || '';
const store = useUserStore();
const { getUserInfo } = storeToRefs(store);
// const { appVersion } = uni.getAppBaseInfo();
function changeAvatar() {
    uni.chooseImage({
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        count: 1,
        success: async res => {
            const image = (
                Array.isArray(res.tempFiles) ? res.tempFiles[0] : res.tempFiles
            ) as UniApp.ChooseImageSuccessCallbackResultFile;
            const { url } = await uploadImage(image.path, image.size);

            try {
                await setUserInfo({
                    headImg: url
                });
                store.updateUserInfo();
                uni.showToast({
                    title: '修改成功'
                });
            } catch (error: any) {
                uni.showToast({
                    title: error.msg,
                    icon: 'none'
                });
            }
        }
    });
}

const dialog = ref();

function changeNickname() {
    dialog.value.open(getUserInfo.value?.trueName);
}

function verifyMobile() {
    router.push('verifyMobile', {
        // type: VerifyType.Change
    });
}

function gotoLogoff() {
    router.push('logoff');
}

function gotoAbout() {
    router.push('about');
}

function logout() {
    uni.showModal({
        title: '是否退出登录?',
        confirmText: '确定',
        cancelText: '取消',
        cancelColor: '#8A9399',
        confirmColor: '#199FFF',
        success: async result => {
            if (result.confirm) {
                await _logout();
                clearToken();
                store.updateLoginStatus();
                router.switchTab('home');
            }
        }
    });
}

function goDebug() {
    router.push('debug');
}
</script>

<template>
    <view class="setting">
        <uni-list :border="false">
            <uni-list-item
                link
                clickable
                @click="changeAvatar"
            >
                <template #header>
                    <image
                        class="setting-avatar"
                        :src="getUserInfo?.headImgOri"
                    />
                </template>
                <template #footer>
                    <view class="setting-right-placeholder">修改头像</view>
                </template>
            </uni-list-item>
            <uni-list-item
                link
                clickable
                @click="changeNickname"
            >
                <template #header>
                    <view class="setting-right-header">昵称</view>
                </template>
                <template #footer>
                    <view class="setting-right-content">{{ getUserInfo?.trueName }}</view>
                </template>
            </uni-list-item>
            <uni-list-item
                link
                clickable
                @click="verifyMobile"
            >
                <template #header>
                    <view class="setting-right-header">修改手机号</view>
                </template>
                <template #footer>
                    <view class="setting-right-content">{{ getUserInfo?.maskedPhone }}</view>
                </template>
            </uni-list-item>
            <view class="setting__line" />
        </uni-list>
        <uni-list :border="false">
            <uni-list-item
                link
                clickable
                @click="gotoAbout"
            >
                <template #header>
                    <view class="setting-right-header">关于我们</view>
                </template>
                <template #footer>
                    <!-- <text class="setting-right-content">v{{ appVersion }}</text> -->
                </template>
            </uni-list-item>
            <uni-list-item
                link
                clickable
                @click="gotoLogoff"
            >
                <template #header>
                    <view class="setting-right-header">注销账号</view>
                </template>
            </uni-list-item>
            <uni-list-item
                v-if="envVersion !== 'release'"
                link
                clickable
                @click="goDebug"
            >
                <template #header>
                    <view class="setting-right-header">调试</view>
                </template>
            </uni-list-item>
            <view class="setting__line" />
            <uni-list-item
                clickable
                :border="false"
                @click="logout"
            >
                <template #body>
                    <view class="setting-logout">退出登录</view>
                </template>
            </uni-list-item>
        </uni-list>
        <NicknameDialog ref="dialog" />
    </view>
</template>

<style scoped lang="scss">
.setting {
    height: 100vh;
    background: $uni-text-color-inverse;

    &-avatar {
        width: 104rpx;
        height: 104rpx;
        border-radius: 8rpx;
    }

    &-right {
        color: $uni-text-color;
        font-size: 28rpx;

        &-placeholder {
            color: #8a9399;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 104rpx;
        }

        &-header {
            height: 88rpx;
            font-weight: 500;
            line-height: 100rpx;
        }

        &-content {
            height: 88rpx;
            font-weight: 400;
            line-height: 88rpx;
        }
    }

    &__line {
        height: 20rpx;
        background: $uni-text-color-inverse;
    }

    &-logout {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 24rpx 0;
        color: $uni-color-title;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 28rpx;
    }
}
</style>
@/api/module/user
