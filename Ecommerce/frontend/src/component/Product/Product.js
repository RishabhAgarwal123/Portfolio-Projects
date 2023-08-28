import React from 'react';
import styles from './Product.module.css';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';

const Product = () => {
    const { products, loader } = useSelector(state => state.product);
    console.log(products)
    return (
        <>
            {loader ? <Loader /> : <>
                <h1 className={styles.homeHeading} id='container'>All Products</h1>
                <div className={styles.product}>
                    {
                        products?.length !== 0 && products?.map((product) => {
                            return <ProductCard product={product} key={product._id} />
                        })
                    }
                </div>
            </>
            }
        </>
    )
}

export default Product