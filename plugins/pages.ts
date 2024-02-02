import glob from 'fast-glob';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import type { Plugin } from 'vite';

export interface Options {
    autoPropsPath: string;
    pagesPath: string;
    filters: RegExp[];
}

/** Props 映射 */
const propsMap = new Map<string, string>();

/** Pages 映射 */
const pagesMap = new Map<string, { [key in string]: any } & { path: string }>();

/** pages.json 全局缓存，避免重复生成 */
let pagesJsonCache = '';

/** auto-props 全局缓存，避免重复生成 */
let pagePropsCache = '';

/**
 * 提取文件文件中的 definePageProps
 * @param filepath
 * @returns [文件名, 声明]
 */
function extractProps(filepath: string): [string, string | undefined] {
    const content = fs.readFileSync(filepath, 'utf-8');
    const regExp = /(?<=definePageProps<)(.|\r|\n)*?(?=>\((.|\r|\n)*\))/g;
    const key = filepath?.split(path.normalize('src/'))[1]?.replace?.('.vue', '');
    const value = regExp.exec(content)?.[0];
    return [key, value];
}

/**
 * 生成页面属性申明文件
 * @param outDir
 */
function generatePagesPropsDeclaration(outDir?: string) {
    let content = 'export {} \n';
    content += 'declare global { \ninterface PropsMap{ \n';
    for (const [key, value] of propsMap) {
        content += `  '${key}'` + ':' + value + '\n';
    }
    content += '}\n}\n';
    if (pagePropsCache !== content) {
        pagePropsCache = content;
        fs.writeFileSync(path.resolve(outDir ?? 'types/auto-props.d.ts'), content);
    }
}

/**
 * 更新 page.json 文件
 */
function updatePagesJson(outDir?: string) {
    const mainPackage: object[] = [];
    const subPackages: { root: string; pages: object[] }[] = [];

    for (const [, value] of pagesMap) {
        const pathArr = value.path.split('/');
        if (pathArr[1] === 'main') {
            // 主包
            mainPackage.push(value);
        } else {
            // 子包
            const rootPath = pathArr.slice(0, 2).join('/');
            const subPackageIndex = subPackages.findIndex(item => item.root === rootPath);
            if (subPackageIndex < 0) {
                /** 子包不存在的情况 */
                subPackages.push({
                    root: rootPath,
                    pages: [
                        {
                            ...value,
                            path: pathArr.slice(2).join('/')
                        }
                    ]
                });
            } else {
                /** 子包存在的情况 */
                subPackages[subPackageIndex].pages.push({
                    ...value,
                    path: pathArr.slice(2).join('/')
                });
            }
        }
    }

    const fileBasePath = path.resolve(process.cwd(), outDir ?? 'src/pages.base.json');
    const filepath = path.resolve(process.cwd(), outDir ?? 'src/pages.json');
    const pagesJson = fse.readJsonSync(fileBasePath);
    // pagesJson.pages = mainPackage;
    pagesJson.subPackages = subPackages;

    const pagesJsonStr = JSON.stringify(pagesJson);
    if (pagesJsonStr !== pagesJsonCache) {
        // 生成 pages.json 时需要校验缓存，避免重复保存带来不必要的刷新
        pagesJsonCache = pagesJsonStr;
        fse.writeJsonSync(filepath, pagesJson, {
            spaces: 4,
            EOL: '\n'
        });
    }
    console.timeEnd('🏳️‍🌈 page props regenerating');
}

/**
 * 构建声明与pages.json
 * @param options
 */
function build(options?: Partial<Options>) {
    /** 读取忽略文件 */
    let zdIgnoreReg: any[] = [];
    if (fs.existsSync(path.resolve('.zdignore'))) {
        const fileContent = fs
            .readFileSync(path.resolve(process.cwd(), '.zdignore'), 'utf-8')
            .split('\n');
        zdIgnoreReg = fileContent.map(item => new RegExp(item));
    }

    /** 读取配置 */
    glob(['src/**/index.json']).then(files => {
        // 匹配忽略
        for (const filename of files) {
            if (zdIgnoreReg.length > 0 && zdIgnoreReg?.every(reg => !reg.test(filename))) {
                continue;
            }

            if (options?.filters?.some(reg => reg.test(filename))) {
                continue;
            }

            // 读取 json 文件
            const router = path
                .resolve(process.cwd(), filename.replace('.json', '.vue'))
                .split(path.normalize('src/'))?.[1]
                ?.replace?.('.vue', '')
                ?.split(path.sep)
                ?.join('/');
            try {
                const pageJson = fse.readJsonSync(path.resolve(process.cwd(), filename));
                pagesMap.set(pageJson.path || router, {
                    ...pageJson,
                    path: router
                });
                const props = extractProps(
                    path.resolve(process.cwd(), filename.replace('.json', '.vue'))
                );
                propsMap.set(props[0], props?.[1] ?? '{} | undefined');

                // 如果有简称，添加简称的映射
                if (pageJson.pageName) {
                    propsMap.set(pageJson.pageName, props[1] ?? '{} | undefined');
                }
            } catch (err) {
                console.error(err);
            }
        }
        generatePagesPropsDeclaration(options?.autoPropsPath);
        updatePagesJson(options?.pagesPath);
    });
}

export default function vitePluginProps(options?: Partial<Options>): Plugin {
    return {
        name: 'vite-plugins-props',
        enforce: 'pre',
        buildStart() {
            console.time('🏳️‍🌈 page props regenerating');
            console.time('构建时间');
            build(options);
        },
        buildEnd() {
            console.timeEnd('构建时间');
        },
        moduleParsed() {
            // console.log('===');
        },
        handleHotUpdate() {
            // handleHotUpdate 在uni中无法使用
        }
    };
}
