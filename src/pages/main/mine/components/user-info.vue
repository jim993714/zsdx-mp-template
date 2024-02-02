<script setup lang="ts">
import { router } from '@zsdx/mp-utils';

import { CampusVerifyStatus, UserVerify } from '@/api/module/user/types';
import { CDN_BASE_URL } from '@/base/constants';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { isLogin, userInfo } = toRefs(userStore);

function onInfoTap() {
    if (isLogin.value) {
        router.push('setting');
        return;
    }

    router.push('login');
}

function goAuth() {
    console.log('去学生认证');
}

function handleCopy() {
    uni.setClipboardData({
        data: userInfo.value?.inviteCode as string,
        success() {
            uni.showToast({
                title: '复制成功',
                icon: 'none'
            });
        }
    });
}
</script>

<template>
    <view
        class="user-info"
        @tap="onInfoTap"
    >
        <image
            class="user-avatar"
            :src="
                isLogin
                    ? userInfo?.headImgOri
                    : `${CDN_BASE_URL}/mp-cs/images/ucenter/default-avatar.png`
            "
            mode="aspectFill"
        />
        <view
            v-if="isLogin"
            class="info"
        >
            <view class="username"> Hello，{{ userInfo?.trueName }} </view>
            <view class="other-info">
                <view
                    class="auth-info"
                    @tap.stop="goAuth"
                >
                    <view
                        v-if="userInfo?.userVerify === UserVerify.Pass"
                        class="auth"
                    >
                        <image
                            class="auth-tag"
                            :src="`${CDN_BASE_URL}/mp-cs/images/ucenter/auth-tag-2.png`"
                            mode="aspectFit"
                        />
                        <view
                            v-if="userInfo.campusVerifyStatus !== CampusVerifyStatus.Pass"
                            class="complete-tag"
                            >待完善</view
                        >
                    </view>
                    <view
                        v-else
                        class="no-auth"
                    >
                        <text>未认证</text>
                        <text class="arrow-right" />
                    </view>
                </view>
                <view
                    v-if="userInfo?.inviteCode"
                    class="invite-code"
                    @tap.stop="handleCopy"
                >
                    邀请码：{{ userInfo?.inviteCode }}
                </view>
            </view>
        </view>
        <view
            v-else
            class="info"
        >
            <view class="username">点击登录</view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.user-info {
    display: flex;
    align-items: center;
    height: 136rpx;
    margin-top: 20rpx;
    padding: 0 52rpx;
    gap: 30rpx;

    .user-avatar {
        width: 136rpx;
        height: 136rpx;
        border-radius: 50%;
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 136rpx;
        gap: 8rpx;
    }

    .other-info {
        display: flex;
        align-items: center;
        gap: 8rpx;
        margin-bottom: -24rpx;

        .auth-info {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70rpx;

            .auth {
                position: relative;
                .auth-tag {
                    display: block;
                    width: 158rpx;
                    height: 70rpx;
                }
                .complete-tag {
                    position: absolute;
                    top: 0;
                    right: -44rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 68rpx;
                    height: 24rpx;
                    border-radius: 20rpx 20rpx 20rpx 0;
                    color: #ffffff;
                    font-size: 16rpx;
                    font-weight: 600;
                    background: $zd-color-red;
                    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(255, 71, 52, 0.45);
                    line-height: 16rpx;
                }
            }

            .no-auth {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 4rpx;
                width: 104rpx;
                height: 32rpx;
                border-radius: 16rpx;
                color: #ffffff;
                font-size: 20rpx;
                font-weight: 400;
                background: rgba(22, 35, 58, 0.3);

                .arrow-right {
                    width: 8rpx;
                    height: 8rpx;
                    border-top: 2rpx solid #fff;
                    border-right: 2rpx solid #fff;
                    transform: rotate(45deg);
                }
            }
        }

        .invite-code {
            display: flex;
            align-items: center;
            height: 32rpx;
            padding: 0 16rpx;
            border-radius: 16rpx;
            color: #ffffff;
            font-size: 20rpx;
            font-weight: 400;
            background: rgba(22, 35, 58, 0.3);
            line-height: 20rpx;
        }
    }

    .username {
        margin-left: 10rpx;
        color: $uni-color-title;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 40rpx;

        &--over {
            font-size: 32rpx;
        }
    }
}
</style>
