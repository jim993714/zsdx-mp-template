import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

import vitePluginPages from './plugins/pages';

//自动导入 vue 的方法
export default defineConfig({
    envDir: 'env',
    plugins: [
        uni(),
        vitePluginPages({
            filters: [/wxcomponents/]
        }),
        AutoImport({
            imports: ['vue', 'uni-app'],
            dts: 'types/auto-imports.d.ts', // 安装好依赖后，重新运行编译即可自动在根目录下生成此声明文件
            eslintrc: {
                enabled: true
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@img': path.resolve(__dirname, 'src/static/images')
        }
    },
    build: {
        target: 'es2015',
        rollupOptions: {
            external: ['zsdx-mp-components', /^zsdx-mp-components:.*/]
        }
    }
});
