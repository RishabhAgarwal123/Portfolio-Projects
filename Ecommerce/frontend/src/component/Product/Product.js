import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';
import { useGetAllProductsQuery } from '../../redux/api';
import { productSliceActions } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import Pagination from '../layout/Pagination/Pagination';

const Product = () => {
    const dispatch = useDispatch();
    const { products, loader, resultPerPage, productCount } = useSelector(state => state.product);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsList, setProductsList] = useState([...products]);
    const { data, error, isLoading, refetch } = useGetAllProductsQuery({ page: currentPage });

    let indexOfLastItem = currentPage * resultPerPage;
    let indexOfFirstItem = indexOfLastItem - resultPerPage;
    const current = productsList.slice(indexOfFirstItem, indexOfLastItem);
    const [currentProducts, setCurrentProducts] = useState(current);;

    const updateProducts = (data) => {
        const { data: products, productCount } = data;
        dispatch(productSliceActions.setAllProducts(products));
        dispatch(productSliceActions.setProductsCount(productCount));
        dispatch(productSliceActions.setResultPerPage(resultPerPage));
        setProductsList([...products])
        setCurrentProducts([...products]);
    }

    const getProductsPerPage = () => {
        // Fetch data using the query hook
        dispatch(productSliceActions.setLoading(true));
        if (!isLoading) {
            if (error) {
                dispatch(productSliceActions.setError(error));
                dispatch(productSliceActions.setLoading(false));
                toast.error(error.error);
                dispatch(productSliceActions.resetState());
            } else if (data) {
                dispatch(productSliceActions.setLoading(false));
                updateProducts(data);
                toast.success('Product fetched successfully');
            }
        }
    }

    const onPageChange = newPage => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        // Refetch when the currentPage changes
        refetch({ page: currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        getProductsPerPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error, isLoading, refetch]);

    return (
        <>
            {loader ? <Loader /> : <>
                <h1 className={'homeHeading'} id='container'>All Products</h1>
                <div className={styles.product}>
                    {
                        currentProducts?.length !== 0 && currentProducts?.map((product) => {
                            return <ProductCard product={product} key={product._id} />
                        })
                    }
                </div>
                <Pagination
                    itemsPerPage={resultPerPage}
                    totalItems={productCount}
                    currentPage={currentPage}
                    onPageChange={onPageChange} // Pass the onPageChange function to the Pagination component
                />
            </>
            }
        </>
    );
}

export default Product;
