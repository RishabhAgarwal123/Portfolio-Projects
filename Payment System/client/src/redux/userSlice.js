import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        reloadUser: false
    },
    reducers: {
        SetUser(state, action) {
            state.user = action.payload
        },
        SetReloadUser(state, action) {
            state.reloadUser = action.payload
        }
    }
});

export const { SetUser, SetReloadUser } = userSlice.actions;
export default userSlice.reducer;