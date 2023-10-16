import { createAction, props } from "@ngrx/store"

export interface ListId {
    listId: string
}

export const setListId = createAction('[ID] Set ID', props<{listId: string}>());
export const getListId = createAction('[ID] Get ID');
export const getListIdSuccess = createAction('[ID] Get ID success', props<{listId: string}>());
export const getListIdFailure = createAction('[ID] Get ID failure', props<{error: any}>());