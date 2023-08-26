import React, { useEffect, useState } from 'react'
import { CgMouse } from 'react-icons/cg';
import styles from './Home.module.css';
import Product from '../Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../../redux/api';
import { productSliceActions } from '../../redux/slices/productSlice';
// import MetaData from '../layout/MetaData';

const Home = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading, refetch } = useGetAllProductsQuery(0);
    const { products, productCount, errorMessage, loading } = useSelector(state => state.product)

    const updateProducts = (data) => {
        const { data: products, productCount } = data;

        dispatch(productSliceActions.setAllProducts(products));
        dispatch(productSliceActions.setProductsCount(productCount));
    }

    const getAllProducts = () => {
        // Fetch data using the query hook
      dispatch(productSliceActions.setLoading(true));
      if (!isLoading) {
        if (error) {
          dispatch(productSliceActions.setError(error.message));
          dispatch(productSliceActions.setLoading(false));
        } else if (data) {
        dispatch(productSliceActions.setLoading(false));
          updateProducts(data)
        }
      }
    }
  
    useEffect(() => {
        getAllProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error, isLoading, dispatch, refetch]); 

  return (
    <>
        {/* <MetaData title='Ecommerce' /> */}
        <div className={styles.banner}>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href='#container'>
                <button>
                    Scroll <CgMouse />
                </button>
            </a>
        </div>
        <h1 className={styles.homeHeading} id='container'>Featured Prodcuts</h1>

        <div className={styles.container}>
            { 
                products && products?.map((product) => {
                    return <Product product={product} key={product._id} />
                })
            }
        </div>
    </>
  )
}

export default Home