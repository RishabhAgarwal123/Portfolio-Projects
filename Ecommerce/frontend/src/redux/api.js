import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ page = 1, keyword = '', price = [0, 150000], category }) => {
                let link = `api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lt]=${price[1]}&page=${page}`;
                if (category)
                    link = `api/v1/products?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lt]=${price[1]}&page=${page}`;

                return {
                    url: link
                }
            },
        }),
        getProduct: builder.query({
            query: ({ id }) => {
                return {
                    url: `/api/v1/products/${id}`
                }
            }
        }),
        loginUser: builder.mutation({
            query: (loginUser) => ({
                url: '/api/v1/users/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: loginUser,
            })
        }),
        register: builder.mutation({
            query: (registerUser) => ({
                url: '',
                method: 'POST',
                body: registerUser,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        })
    })
});

export const {
    useGetAllProductsQuery,
    useGetProductQuery,
    useLoginUserMutation,
    useRegisterMutation
} = api;
