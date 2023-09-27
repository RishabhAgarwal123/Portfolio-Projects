import { configureStore } from "@reduxjs/toolkit";
import { api }from "./api";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        product: productSlice,
        user: userSlice,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});