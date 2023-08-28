/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react'
import { useGetProductQuery } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { productSliceActions } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Loader from '../layout/Loader/Loader';
import ReactStars from 'react-rating-stars-component';
import styles from './ProductDetail.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const options = {
  edit: false,
  color: 'rgba(20, 20, 20, 0.1)',
  activeColor: 'tomato',
  size: window.innerWidth < 600 ? 20 : 25,
  value: 2.5,
  isHalf: true
}

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.product)
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useGetProductQuery({ id });
  const updateProduct = (product) => {
    dispatch(productSliceActions.setProduct(product.data));
  }

  const getProduct = () => {
    dispatch(productSliceActions.setLoading(true));
    if (!isLoading) {
      if (error) {
        dispatch(productSliceActions.setError(error));
        dispatch(productSliceActions.setLoading(false));
        toast.error(error.error);
        dispatch(productSliceActions.resetState());
      } else if (data) {
        dispatch(productSliceActions.setLoading(false));
        updateProduct(data)
        toast.success(data.message)
      }
    }
  }

  useEffect(() => {
    getProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isLoading, refetch, id])
  return (
    <>
      { loading ? <Loader /> : <>
        <div className={styles.productDetails}>
        <div className={styles.productCarousel}>
          <Carousel showThumbs={false} showStatus={false} emulateTouch>
            {product?.images &&
              product.images.map((image) => (
                <div key={image._id}>
                  <img src={image.url} alt={`Image ${image._id}`} />
                </div>
              ))}
          </Carousel>
        </div>
        <div className={styles.column_75}>
          <div className={styles.productTitle}>
            <h2>{product?.name}</h2>
            <p>Product # {product?._id}</p>
          </div>
          <div className={styles.productDescription}>
            <p>{product?.description}</p>
          </div>

          <div className={styles.productPrice}>
            <h3>{`₹${product?.price}`}</h3>
            <div className={styles.details_carts}>
              <div className={styles.details_cart}>
                <button>-</button>
                <input value={1} type='number' onChange={() => console.log()} />
                <button>+</button>
              </div>
              <button className={styles.addToCart} disabled={product?.stock < 1 ? true: false} >Add to cart</button>
            </div>
            <p>
              Stock: <b className={product?.stock < 1 ? styles.redColor : styles.greenColor}>
                {product?.stock < 1 ? 'Out of stock' : 'In stock'}
              </b>
            </p>
          </div>

          <div className={styles.details_review}>
            <ReactStars {...options} /> <span>{`(${product?.numberOfReviews} Reviews )`}</span>
          </div>

          <button className={styles.submitReview}>Submit Reviews</button>
        </div>
      </div>
      </>}
    </>
  )
}

export default ProductDetail