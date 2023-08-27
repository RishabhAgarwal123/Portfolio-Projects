import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading: false,
    products: [],
    productsCount: 0,
    errorMessage: null
};

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.products = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setProductsCount: (state, action) => {
            state.productsCount = action.payload
        },
        setError: (state, action) => {
            state.errorMessage = action.payload
        },
        resetState: (state) => {
            return initialState
        }
    },
});

export const productSliceActions = {
    ...productSlice.actions
}

export default productSlice.reducer;