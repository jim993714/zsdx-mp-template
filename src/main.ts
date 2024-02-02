import '@/utils/time';

import { initPages } from '@zsdx/mp-utils';
import { createSSRApp } from 'vue';

import trackView from '@/components/track-view/index.vue';
import pinia from '@/stores/index';

import App from './App.vue';
import { pages, subPackages } from './pages.json';

initPages(pages, subPackages);

export function createApp() {
    const app = createSSRApp(App);

    app.use(pinia);
    app.component('TrackView', trackView);
    return {
        app
    };
}
