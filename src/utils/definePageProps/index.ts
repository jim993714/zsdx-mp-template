/**
 * 定义页面参数类型约束
 * @param options
 * @returns
 */
export type Props = Record<string, string | number | undefined | null>;

export default function definePageProps<T extends Props = Props>(callback?: (options: T) => void) {
    const options_ = ref<T>();
    onLoad(options => {
        options_.value = options as T;
        callback?.(options as T);
    });
    return options_;
}
