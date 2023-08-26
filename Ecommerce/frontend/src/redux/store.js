import { configureStore } from "@reduxjs/toolkit";
import { api }from "./api";
import productSlice from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        product: productSlice, 
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});