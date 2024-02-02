<script setup lang="ts">
import type { IShopInfo } from '../api/types';

const zdmodalRef = ref();
const props = defineProps<{
    shopInfo?: IShopInfo;
    show: Boolean;
}>();

watch(
    () => props.show,
    value => {
        if (value && (props.shopInfo?.groupQrcode || props.shopInfo?.intro)) {
            zdmodalRef?.value.open('center');
        }
    }
);
const showShopInfo = (item: any) => {
    if (!item.show) {
        emit('closeShopInfoPopup');
    }
    if (item == 'close') {
        zdmodalRef?.value.close();
    }
};

const call = () => {
    uni.makePhoneCall({
        phoneNumber: props.shopInfo?.studentShopUser.phone + ''
    });
};
const emit = defineEmits(['closeShopInfoPopup']);
</script>

<template>
    <zd-popup
        ref="zdmodalRef"
        class="zd-popup"
        :is-mask-click="true"
        :safe-area="true"
        @change="showShopInfo"
    >
        <view class="modal-content">
            <image
                :src="props.shopInfo?.shopLogo"
                class="modal-head"
                mode="scaleToFill"
            />
            <view class="modal-info">
                <view class="modal-shop-name">{{ props.shopInfo?.shopName }}</view>
                <view class="modal-school-name">{{
                    props.shopInfo?.studentShopUser?.schoolName
                }}</view>
                <view class="modal-code-warp">
                    <image
                        src="https://cdn.zsdx.cn/mp-cs/images/home/code-bg.png"
                        class="modal-code-bg"
                        mode="scaleToFill"
                    />
                    <view
                        v-if="props.shopInfo?.groupQrcode"
                        class="modal-code-border"
                    >
                        <image
                            class="modal-code-img"
                            :src="props.shopInfo?.groupQrcode"
                            mode="scaleToFill"
                            :show-menu-by-longpress="true"
                        />
                    </view>
                </view>
                <view class="modal-tip-one">长按识别二维码</view>
                <view class="modal-tip-two">添加微信享贴心服务</view>
                <view
                    v-if="props.shopInfo?.studentShopUser.phone"
                    class="modal-phone-warp"
                    @tap.prevent="call"
                >
                    <text class="modal-phone-number"
                        >联系电话：{{ props.shopInfo?.studentShopUser.phone || 0 }}</text
                    >
                    <zd-icon
                        :size="24"
                        type="zdmp-dianhua"
                        color="#199fff"
                        style="line-height: 24rpx"
                    />
                </view>
                <view
                    v-if="props.shopInfo?.intro"
                    class="modal-desc"
                    >{{ props.shopInfo?.intro }}</view
                >
                <image
                    class="modal-close"
                    src="https://cdn.zsdx.cn/mp-cs/images/home/close.png"
                    mode="scaleToFill"
                    @tap.prevent="showShopInfo('close')"
                />
            </view>
        </view>
    </zd-popup>
</template>

<style lang="scss" scoped>
.modal-content {
    position: relative;
    width: 590rpx;
    padding-bottom: 150rpx;
    border: 1rpx solid transparent;
    .modal-head {
        position: absolute;
        top: 0;
        left: 50%;
        width: 120rpx;
        height: 120rpx;
        transform: translateX(-50%);
        border-radius: 50%;
    }
    .modal-info {
        display: flex;
        align-items: center;
        width: 590rpx;
        margin-top: 60rpx;
        padding-bottom: 40rpx;
        border-radius: 40rpx;
        background: linear-gradient(135deg, #ffffff 0%, #d9efff 100%);
        flex-direction: column;
        .modal-shop-name {
            margin-top: 80rpx;
            color: #292f33;
            font-size: 36rpx;
            font-weight: 500;
            line-height: 40rpx;
        }
        .modal-school-name {
            margin-top: 10rpx;
            padding: 10rpx 20rpx;
            border-radius: 22rpx;
            color: #199fff;
            font-size: 20rpx;
            font-weight: 400;
            line-height: 20rpx;
            background: rgba(25, 159, 255, 0.1);
        }
        .modal-code-warp {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 284rpx;
            height: 288rpx;
            margin-top: 16rpx;
            .modal-code-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 284rpx;
                height: 288rpx;
            }
        }

        .modal-tip-one {
            margin-top: 16rpx;
            color: #576066;
            font-size: 24rpx;
            font-weight: 400;
            line-height: 24rpx;
        }
        .modal-tip-two {
            margin-top: 12rpx;
            color: #576066;
            font-size: 28rpx;
            font-weight: 500;
            line-height: 28rpx;
        }
        .modal-desc {
            width: 510rpx;
            margin-top: 20rpx;
            padding: 20rpx;
            border: 2rpx solid;
            border-radius: 16rpx;
            color: #576066;
            font-size: 24rpx;
            font-weight: 400;
            background: rgba(255, 255, 255, 0.5);
            line-height: 36rpx;
            border-image: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)) 2
                2;
        }
        .modal-close {
            position: absolute;
            bottom: 20rpx;
            left: 50%;
            transform: translateX(-50%);
            width: 49rpx;
            height: 49rpx;
        }
        .modal-code-border {
            position: relative;
            width: 200rpx;
            height: 200rpx;
            border-radius: 8rpx;
            background: #ffffff;
            box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(25, 159, 255, 0.5);
            .modal-code-img {
                position: absolute;
                top: 0;
                left: 0;
                width: 200rpx;
                height: 200rpx;
            }
        }
    }
}
.modal-phone-warp {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
    .modal-phone-number {
        margin-right: 20rpx;
        color: #199fff;
        font-size: 24rpx;
        font-weight: 500;
    }
}
</style>
