export interface PaginationResult<T> {
    list: T[];
    page: {
        /** 当前分页 */
        currentPage: number;
    };
}
