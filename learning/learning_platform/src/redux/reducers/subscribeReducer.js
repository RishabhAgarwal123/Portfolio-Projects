import { createReducer } from "@reduxjs/toolkit";

export const subscribeReducer = createReducer({}, {
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    buySubscriptionRequest: (state) => {
        state.loading = true;
    },
    buySubscriptionSuccess: (state, action) => {
        state.loading = false;
        state.subscriptionId = action.payload;
    },
    buySubscriptionFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
});