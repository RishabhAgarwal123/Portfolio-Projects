import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    authenticated: false,
    user: null,
    errorMessage: null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.errorMessage = action.payload
        },
        resetState: () => {
            return initialState
        }
    }
});

export const userSliceActions = {
    ...userSlice.actions
}

export default userSlice.reducer;