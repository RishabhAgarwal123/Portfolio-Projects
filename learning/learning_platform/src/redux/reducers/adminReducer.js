import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, {
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    createCourseRequest: (state) => {
        state.loading = true;
    },
    createCourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    createCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteCourseRequest: (state) => {
        state.loading = true;
    },
    deleteCourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    createLectureRequest: (state) => {
        state.loading = true;
    },
    createLectureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    createLectureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteLectureRequest: (state) => {
        state.loading = true;
    },
    deleteLectureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteLectureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
});