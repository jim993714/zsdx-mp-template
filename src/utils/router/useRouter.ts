import { type BackParams, router as router_ } from '@zsdx/mp-utils';

/**
 * 为router 赋予 PropsMap 类型约束
 * @returns
 */
export default function useRouter() {
    function push<T extends keyof PropsMap, P extends PropsMap[T]>(
        path: T,
        params?: P
    ): Promise<any> {
        return router_.push(path, params);
    }

    function redirect<T extends keyof PropsMap, P extends PropsMap[T]>(path: T, params?: P) {
        return router_.push(path, params);
    }

    function reLaunch<T extends keyof PropsMap, P extends PropsMap[T]>(path: T, params?: P) {
        return router_.reLaunch(path, params);
    }

    function switchTab<T extends keyof PropsMap, P extends PropsMap[T]>(path: T, params?: P) {
        return router_.switchTab(path, params);
    }

    function back({ delta }: BackParams = { delta: 1, data: null }) {
        return router_.back({ delta });
    }
    return {
        push,
        redirect,
        reLaunch,
        switchTab,
        back
    };
}

export const router = useRouter();
