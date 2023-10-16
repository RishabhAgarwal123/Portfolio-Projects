import { Action, createReducer, on } from "@ngrx/store";
import { ListId, getListIdFailure, getListIdSuccess, setListId } from "../actions/app.actions";

export const initialState: ListId = {
    listId: ''
};

const listReducer = createReducer(
    initialState,
    on(setListId, (state, { listId }) => ({...state, listId})),
    on(getListIdSuccess, (state, { listId }) => ({...state, listId})),
    on(getListIdFailure, (state) => ({...state, listId: ''})),
);

export function reducer(state: any, action: any) {
    return listReducer(state, action);
}