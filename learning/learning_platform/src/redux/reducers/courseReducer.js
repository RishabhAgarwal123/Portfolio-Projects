import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer({ courses: [] }, {
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    allCoursesRequest: (state) => {
        state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
        state.loading = false;
        state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
});