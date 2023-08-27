import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({page}) => {
                return {
                    url: page ? `/api/v1/products?page=${page}` : `/api/v1/products`
                }
            },
        }),
        getProduct: builder.query({
            query: ({id}) => {
                console.log(id)
                return {
                    url: `/api/v1/products/${id}`
                }
            }
        })
    })
});

export const { 
    useGetAllProductsQuery,
    useGetProductQuery
 } = api;
