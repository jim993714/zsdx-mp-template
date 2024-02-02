<script setup lang="ts">
import { clickTrack, Disconnect, exposureInit, exposureTrack } from '@zsdx/mp-utils';
import { getCurrentInstance } from 'vue';

import type { ITrackOptions } from './type';

const instance = getCurrentInstance();

const props = defineProps<{
    trackData: ITrackOptions;
}>();

onMounted(() => {
    nextTick(() => {
        if (props.trackData.type == 'all' || props.trackData.type == 'exposure') {
            exposureInit(instance);
            let trackData = props.trackData;
            trackData.eventData.action = 1;
            if (!trackData.eventData.student_shop_id) {
                const studentShopId = uni.getStorageSync('studentShopId');
                trackData.eventData.student_shop_id = studentShopId;
            }
            if (props.trackData.exposureData) {
                trackData.eventData = {
                    ...trackData.eventData,
                    ...trackData.exposureData
                };
            }
            exposureTrack(trackData);
        }
    });
});

const touchTrack = () => {
    if (props.trackData.type == 'all' || props.trackData.type == 'click') {
        let trackData = props.trackData;
        trackData.eventData.action = 2;
        if (!trackData.eventData.student_shop_id) {
            const studentShopId = uni.getStorageSync('studentShopId');
            trackData.eventData.student_shop_id = studentShopId;
        }
        if (props.trackData.clickData) {
            trackData.eventData = {
                ...trackData.eventData,
                ...trackData.clickData
            };
        }
        trackData.type = 'click';
        clickTrack(trackData);
    }
};
</script>

<template>
    <view
        :class="props.trackData.observerName + ''"
        class="track-view"
        @tap="touchTrack"
    >
        <slot />
    </view>
</template>

<style lang="scss" scoped>
.track-view {
    width: 100%;
}
</style>
