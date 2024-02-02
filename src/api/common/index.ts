import { useRequest } from '@zsdx/mp-utils';

const request = useRequest();

/**
 * 上传图片
 */
export function uploadImage(filePath: string, size: number) {
    return request.upload(
        '/student-school-shop/basic/sign/upload/image',
        filePath,
        size,
        'image'
    ) as Promise<{
        url: string;
    }>;
}

/**
 * 上传文件
 */
export function uploadFile(filePath: string, size: number) {
    return request.upload(
        '/student-school-shop/basic/sign/upload/file',
        filePath,
        size,
        'file'
    ) as Promise<{
        url: string;
    }>;
}

/**
 * 预览文件
 */
export function getFile(path: string) {
    return request.post<string>('/student-school-shop/basic/file/uri', {
        path: path
    });
}

/**
 * 获取系统时间
 */
export function getSystemTime() {
    return request.post<number>('/student-school-shop/basic/setting/now');
}

/**
 * 获取验证码
 */
export function getVerify(key?: string) {
    return request.post<string>('/student-school-shop/basic/verify', { key });
}
