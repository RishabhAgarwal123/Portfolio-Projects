export interface TaskResponse {
    success: Boolean,
    status: number,
    tasks: [],
    message: string
    _id: string,
    listId: string,
    completed: boolean,
    title: string,
    task: {
        listId: string,
        completed: Boolean,
        title: string
    }
}