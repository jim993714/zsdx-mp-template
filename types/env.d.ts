/// <reference types="vite/client" />
import ZdMaterial from '@zsdx/mp-material/dist/lib/type';

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'vue' {
    export interface GlobalComponents extends ZdMaterial {}
}
