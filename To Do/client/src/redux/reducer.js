// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: {},
  tasks: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload
    }
  },
});

export const { setUser, setLoading, setTasks } = userSlice.actions;
export default userSlice.reducer;
