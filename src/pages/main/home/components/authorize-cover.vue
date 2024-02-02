<script setup lang="ts">
const { safeArea, screenHeight } = uni.getSystemInfoSync();
const bottomAreaHeight = screenHeight - (safeArea?.bottom || 0);

const pageHeight = uni.getWindowInfo().windowHeight + 50 + bottomAreaHeight || 0;
const infoHeight = bottomAreaHeight + 50 + uni.upx2px(692);
const avatarImg = ref('');
const nickName = ref('');
const fnStop = (e: any) => {
    e && e.stopPropagation();
};

const close = () => {
    emit('close');
};
const confirm = async () => {
    if (!avatarImg.value || !nickName.value) return;

    emit('confirm', { avatarUrl: avatarImg.value, nickName: nickName.value });
};

const onBlur = (e: any) => {
    nickName.value = e.detail.value;
};

const chooseAvatar = async (e: any) => {
    avatarImg.value = e.detail.avatarUrl || '';
};
const emit = defineEmits(['close', 'confirm']);
</script>

<template>
    <view
        class="auth-dialog"
        :style="{ height: pageHeight + 'px' }"
        @touchmove.stop="fnStop"
    >
        <view
            class="auth-info"
            :style="{ height: infoHeight + 'px' }"
        >
            <view class="auth-head">
                <zd-icon
                    :size="48"
                    type="zdmp-zhangdalogo"
                    color="#199FFF"
                ></zd-icon>
                <view class="head-title">欢迎登录掌上大学</view>
                <zd-icon
                    :size="36"
                    type="zdmp-guanbidefuben"
                    color="#999999"
                    @tap.prevent="close"
                ></zd-icon>
            </view>
            <view class="get-info-title">获取您的头像与昵称</view>

            <view class="tips-text">授权你的微信头像和昵称，便于订单发货和售后沟通</view>
            <view class="user-info">
                <view class="item-line"></view>
                <view class="info-item">
                    <view class="item-label">头像</view>

                    <button
                        class="item-right"
                        open-type="chooseAvatar"
                        @chooseavatar="chooseAvatar"
                    >
                        <image
                            v-if="!avatarImg"
                            class="avatar-img"
                            src="https://cdn.zsdx.cn/mp-cs/images/home/default-avatar.png"
                            mode="aspectFill"
                        ></image>
                        <image
                            v-else
                            class="avatar-img"
                            :src="avatarImg"
                            mode="aspectFill"
                        ></image>

                        <view></view>
                        <zd-icon
                            :size="24"
                            type="zdmp-qianwang"
                            color="#999999"
                        ></zd-icon>
                    </button>
                </view>
                <view class="info-item">
                    <view class="item-label">昵称</view>
                    <view class="item-right">
                        <input
                            class="item-input"
                            type="nickname"
                            placeholder="请输入昵称(可同步微信昵称)"
                            @change="onBlur"
                        />
                    </view>
                </view>
            </view>
            <view
                class="confirm"
                :class="{ disabled: !nickName || !avatarImg }"
                @tap.prevent="confirm"
            >
                确认使用
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.auth-dialog {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 750rpx;
    background: rgba(0, 0, 0, 0.5);
}
.auth-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750rpx;
    padding: 40rpx;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    background: #ffffff;
    box-sizing: border-box;
}
.auth-head {
    display: flex;
    align-items: center;
    .head-title {
        margin: 0 310rpx 0 20rpx;
        color: #292f33;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 40rpx;
    }
}

.get-info-title {
    margin: 48rpx 0 20rpx;
    color: #292f33;
    font-size: 32rpx;
    font-weight: 600;
    line-height: 40rpx;
}
.tips-text {
    color: #292f33;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
}

.user-info {
    position: relative;
    width: 670rpx;
    height: 240rpx;
    margin: 40rpx 0;
    padding: 20rpx 0;
    border-radius: 24rpx;
    background: #f5f8fa;
    box-sizing: border-box;

    .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 670rpx;
        height: 100rpx;
        padding: 0 40rpx;
        box-sizing: border-box;
        flex-direction: row;
        .item-label {
            color: #292f33;
            font-size: 32rpx;
            font-weight: 600;
            line-height: 40rpx;
        }
        .item-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .avatar-img {
                width: 80rpx;
                height: 80rpx;
                margin-right: 20rpx;
                border-radius: 50%;
            }
            .item-input {
                width: 356rpx;
                height: 40rpx;
                text-align: right;
            }
        }
    }
    .item-line {
        position: absolute;
        top: 120rpx;
        left: 20rpx;
        width: 620rpx;
        height: 2rpx;
        background: #edf0f2;
    }
}

.confirm {
    width: 670rpx;
    height: 100rpx;
    border-radius: 16rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 500;
    background: #1aab37;
    line-height: 100rpx;
}
.disabled {
    opacity: 0.5;
}

button::after {
    border: none !important;
}
button {
    padding: 0;
    border: 1rpx solid transparent;
    background: transparent;
}
</style>
