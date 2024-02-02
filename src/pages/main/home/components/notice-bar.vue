<script setup lang="ts">
const props = defineProps({
    /** 文字颜色 */
    color: {
        type: String,
        default: ''
    },
    /** 背景色 */
    background: {
        type: String,
        default: ''
    },
    /** 公告内容 */
    notice: {
        type: String,
        default: ''
    }
});
const contentWidth = ref(1);
const textWidth = ref(0);
const instance = getCurrentInstance();
const content = ref('');
const showAnimation = ref(false);

watch(
    () => [contentWidth.value, textWidth.value],
    () => {
        showAnimation.value = contentWidth.value <= textWidth.value ? true : false;
        if (showAnimation.value) {
            content.value =
                props.notice +
                '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                props.notice +
                '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                props.notice +
                '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                props.notice +
                '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                props.notice;
        } else {
            content.value = props.notice || '';
        }
    },
    { immediate: true }
);
const getContentWidth = () => {
    let query = uni.createSelectorQuery().in(instance);
    query
        .select('.notice-content')
        .boundingClientRect((rect: any) => {
            contentWidth.value = rect.width || 0;
        })
        .exec();
    query
        .select('.notice-text')
        .boundingClientRect((rect: any) => {
            textWidth.value = rect.width || 0;
        })
        .exec();
};
onMounted(async () => {
    getContentWidth();
});

const fnHideNoticeBar = () => {
    emit('hideNoticeBar');
};

const emit = defineEmits(['hideNoticeBar']);
</script>

<template>
    <view
        class="notice-wrap"
        :style="{ background: props.background }"
    >
        <view
            class="notice-label"
            :style="{ color: props.color }"
        >
            本店公告：</view
        >
        <view class="content">
            <view
                class="notice-content"
                :class="{ animation: showAnimation }"
            >
                <view
                    class="notice-text"
                    :style="{ color: props.color }"
                    >{{ content }}</view
                >
            </view>
        </view>

        <text
            class="zdfont zdmp-guanbi1 close"
            :style="{ color: props.color }"
            @tap.prevent="fnHideNoticeBar"
        ></text>
    </view>
</template>

<style lang="scss" scoped>
@keyframes remindMessage {
    0% {
        -webkit-transform: translateX(0%);
    }

    100% {
        -webkit-transform: translateX(-100%);
    }
}
.notice-label {
    font-size: 24rpx;
}
.notice-wrap {
    display: flex;
    align-items: center;
    width: 750rpx;
    height: 48rpx;
    padding: 0 20rpx;
    flex-direction: row;
    box-sizing: border-box;
}
.content {
    display: flex;
    overflow: hidden;
    margin-right: 10rpx;
    flex: 1;
}
.notice-content {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.notice-text {
    height: 48rpx;
    white-space: nowrap;
    font-size: 24rpx;
    line-height: 48rpx;
}
.animation {
    animation: remindMessage 40s linear infinite;
}

.close {
    width: 26rpx;
    font-size: 26rpx;
}
</style>
