export interface IEvn {
    label: string;
    baseUrl: string;
    mode: string;
}

export interface PagePaths {
    [key: string]: string;
}
export interface pageItem {
    path: string;
    pageName: string;
    auth?: boolean;
}
export interface subPage {
    root: string;
    pages: pageItem[];
}
