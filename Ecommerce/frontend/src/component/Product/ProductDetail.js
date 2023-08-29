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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductDetail.module.css';
import Review from './Review';

const options = {
  edit: false,
  color: 'rgba(20, 20, 20, 0.1)',
  activeColor: 'tomato',
  size: window.innerWidth < 600 ? 20 : 25,
  value: 2.5,
  isHalf: true
}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 5000,
  autoplaySpeed: 5000,
  cssEase: "linear"
};

const cards = [
  { name: 'Rishabh Agarwal', rating: 4, description: 'Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1'},
  { name: 'Rishabh', rating: 4, description: 'Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1'},
  { name: 'Rishabh', rating: 4, description: 'Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1'},
  { name: 'Rishabh', rating: 4, description: 'Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1'},
];

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.product)
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useGetProductQuery({ id });

  const newOtpions = { ...options, value: product?.ratings }

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
      {loading ? <Loader /> : <>
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
              <div className={styles.productCarts}>
                <div className={styles.productCart}>
                  <button className={styles.minus}>-</button>
                  <input value={1} type='number' className={styles.input} onChange={() => console.log()} />
                  <button className={styles.plus}>+</button>
                </div>
                <button className={styles.btn} disabled={product?.stock < 1 ? true : false} >Add to cart</button>
              </div>
              <p>
                Stock: <b className={product?.stock < 1 ? styles.redColor : styles.greenColor}>
                  {product?.stock < 1 ? 'Out of stock' : 'In stock'}
                </b>
              </p>
            </div>

            <div className={styles.details_review}>
              <ReactStars {...newOtpions} /> <span>{`(${product?.numberOfReviews} Reviews )`}</span>
            </div>

            <button className={styles.btn}>Submit Reviews</button>
          </div>
        </div>

        {product?.reviews?.length === 0 && <div className='homeHeading'>Reviews</div>}
        {
          product?.reviews?.length === 0 ? <div className={`${styles.review}`}>
            <div className={styles.cardSliderContainer}>
              <Slider {...settings}>
                {cards.map((review, index) => {
                  return <Review review={review} key={index}/>
                })}
              </Slider>
            </div>
          </div> : <div className='homeHeading'>No Reviews Yet</div>
        }
      </>}
    </>
  )
}

export default ProductDetail