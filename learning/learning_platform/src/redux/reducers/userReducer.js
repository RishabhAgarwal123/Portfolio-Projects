import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, {
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    loginFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.paylaod;
    },
    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
    },
    logoutFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.paylaod;
    },
    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action?.payload;
    },
    loadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.paylaod;
    },
    registerRequest: (state) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    registerFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.paylaod;
    }
});

export const profileReducer = createReducer({}, {
    changePasswordRequest: (state) => {
        state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.paylaod;
    },
    changePasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.paylaod;
    },
    forgetPasswordRequest: (state) => {
        state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.paylaod;
    },
    forgetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.paylaod;
    },
    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.paylaod;
    },
    resetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.paylaod;
    },
    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.paylaod;
    },
    updateProfileFail: (state, action) => {
        state.loading = false;
        state.error = action.paylaod;
    },
    updateProfilePictureRequest: (state) => {
        state.loading = true;
    },
    updateProfilePictureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.paylaod;
    },
    updateProfilePictureFail: (state, action) => {
        state.loading = false;
        state.error = action.paylaod;
    },
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});