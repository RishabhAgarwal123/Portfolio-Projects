// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  reducer: {
    user: reducer, // Use your userSlice reducer
  },
});

export default store;
