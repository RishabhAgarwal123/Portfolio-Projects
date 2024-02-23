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
    getAllUsersRequest: (state) => {
        state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getAdminStatsRequest: (state) => {
        state.loading = true;
    },
    getAdminStatsSuccess: (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.subscriptionCount = action.payload.subscriptionCount;
        state.subscriptionIncreased = action.payload.subscriptionIncreased;
        state.subscriptionPercentage = action.payload.subscriptionPercentage;
        state.usersCount = action.payload.usersCount;
        state.usersIncreased = action.payload.usersIncreased;
        state.usersPercentage = action.payload.usersPercentage;
        state.viewsCount = action.payload.viewsCount;
        state.viewsIncreased = action.payload.viewsIncreased;
        state.viewsPercentage = action.payload.viewsPercentage;
    },
    getAdminStatsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateUserRoleRequest: (state) => {
        state.loading = true;
    },
    updateUserRoleSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateUserRoleFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteUserRequest: (state) => {
        state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
});