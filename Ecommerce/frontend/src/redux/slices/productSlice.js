import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading: false,
    products: [],
    product: null,
    productsCount: 0,
    resultPerPage: 0,
    errorMessage: null
};

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.products = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setProductsCount: (state, action) => {
            state.productsCount = action.payload
        },
        setResultPerPage: (state, action) => {
            state.resultPerPage = action.payload
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