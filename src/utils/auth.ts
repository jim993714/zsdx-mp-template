import { storage } from '@zsdx/mp-utils';

const TOKEN_KEY = 'Authorization';
const localStorage = storage();

export const isLogin = () => {
    return !!localStorage.get(TOKEN_KEY);
};

export const getToken = () => {
    return localStorage.get(TOKEN_KEY);
};

export const setToken = (token: string) => {
    localStorage.set(TOKEN_KEY, token);
};

export const clearToken = () => {
    localStorage.remove(TOKEN_KEY);
};
