export interface ListResponse {
    success: Boolean,
    status: number,
    lists: [],
    message: string,
    _id: string,
    title: string,
    list: {
        title: string,
        _id: string
    }
}