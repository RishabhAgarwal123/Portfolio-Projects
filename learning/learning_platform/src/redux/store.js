import { configureStore } from '@reduxjs/toolkit';
import { courseReducer } from './reducers/courseReducer';
import { subscribeReducer } from './reducers/subscribeReducer';
import { profileReducer, userReducer } from './reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        courses: courseReducer,
        subscription: subscribeReducer
    }
});

export default store;

export const server = 'http://localhost:4000/api/v1';