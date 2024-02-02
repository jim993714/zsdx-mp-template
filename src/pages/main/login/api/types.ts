export interface loginParams {
    phone: string;
    phone_verify_code: string;
}

export interface LoginRes {
    userToken: string;
    newUser: 1 | 0;
}
