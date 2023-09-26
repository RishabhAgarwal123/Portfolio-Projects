import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import styles from './Product.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';
import { useGetAllProductsQuery } from '../../redux/api';
import { productSliceActions } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import Pagination from '../layout/Pagination/Pagination';
import { useSearch } from '../utils/SearchContext';
import { Slider, Typography, typographyClasses } from '@mui/material';

const CATEGORIES = [
    'Laptop',
    'Mobile',
    'Bottoms',
    'Shirts',
    'Camera',
    'Shoes'
];

const Product = () => {
    const dispatch = useDispatch();
    const { searchText } = useSearch();
    const { products, loader, resultPerPage } = useSelector(state => state.product);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsList, setProductsList] = useState([...products]);
    const [debouncedSearch, setDebouncedSearch] = useState(searchText);
    const [productsCount, setProductsCount] = useState();
    const [price, setPrice] = useState([0, 150000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(2.5);
    const { data, error, isLoading, refetch } = useGetAllProductsQuery({
        page: currentPage,
        category: category,
        price: price
    });

    let indexOfLastItem = currentPage * resultPerPage;
    let indexOfFirstItem = indexOfLastItem - resultPerPage;
    const current = productsList.slice(indexOfFirstItem, indexOfLastItem);
    const [currentProducts, setCurrentProducts] = useState(current);

    const updateProducts = (data) => {
        const { data: products, productCount, resultPerPage } = data;
        dispatch(productSliceActions.setAllProducts(products));
        dispatch(productSliceActions.setProductsCount(productCount));
        dispatch(productSliceActions.setResultPerPage(resultPerPage));
        setProductsList([...products])
        setCurrentProducts([...products]);
        setProductsCount(productCount);
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

    const fetch = () => {
        refetch({
            page: currentPage,
            category: category,
            price: price
        });
    }

    const ratingChanged = (newRating) => {
        setRatings(newRating);
        console.log(newRating);
    }

    const onPageChange = newPage => {
        setCurrentPage(newPage);
        fetch();
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
        fetch();
    }

    const filterCategory = (cate) => {
        setCategory(cate);
        fetch();
    }

    useEffect(() => {
        getProductsPerPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error, isLoading, refetch]);

    useEffect(() => {
        // Update the debounced search text when searchText changes
        setDebouncedSearch(searchText);
    }, [searchText]);

    useEffect(() => {
        // Use the debounced search text for filtering products
        const filteredProducts = productsList.filter((product) =>
            product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        setCurrentProducts(filteredProducts);
    }, [debouncedSearch, productsList]);

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

                <div className={styles.filterBox}>
                    <Typography>Price</Typography>
                    <Slider sx={{
                        '& .MuiSlider-thumb': {
                            color: "#ff6f61"
                        },
                        '& .MuiSlider-track': {
                            color: "#f98074"
                        }
                    }}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={150000}
                        value={price}
                        onChange={priceHandler}
                    />

                    <Typography className={styles.typo} onClick={() => {
                        setCategory('');
                    }}>Catgories</Typography>
                    <ul className={styles.categoryBox}>
                        {CATEGORIES.map((categ) => {
                            return <li
                                className={`${categ === category ? styles.active : ''} ${styles.categoryLink}`}
                                key={categ}
                                onClick={() => filterCategory(categ)}
                            >
                                {categ}
                            </li>
                        })}
                    </ul>

                    <Typography sx={{ marginTop: '20px' }}>Ratings</Typography>
                    <div className={styles.details_review}>
                        <ReactStars
                            edit={true}
                            value={ratings}
                            color='rgba(20, 20, 20, 0.1)'
                            activeColor='tomato'
                            size={window.innerWidth < 600 ? 20 : 25}
                            isHalf={true}
                            onChange={ratingChanged}
                        />
                    </div>
                </div>

                {(price[0] === 0 && price[1] === 150000) && resultPerPage < productsCount && <Pagination
                    itemsPerPage={resultPerPage}
                    totalItems={productsCount}
                    currentPage={currentPage}
                    onPageChange={onPageChange} // Pass the onPageChange function to the Pagination component
                />}
            </>
            }
        </>
    );
}

export default Product;
