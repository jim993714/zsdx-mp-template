export interface ActionInfo {
    type: string;
    param: string;
    params?: ParamMap;
    paramMap: ParamMap;
    name: string;
    extraParam?: any;
    target: string;
}
export interface ParamMap {
    [key: string]: string;
}
