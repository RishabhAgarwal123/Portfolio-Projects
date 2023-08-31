import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import styles from './ProductCard.module.css';

const options = {
  edit: false,
  color: 'rgba(20, 20, 20, 0.1)',
  activeColor: 'tomato',
  size: window.innerWidth < 600 ? 20: 25,
  value: 2.5,
  isHalf: true
}

const ProductCard = ({product}) => {
  const { name, images, price, _id, numberOfReviews, ratings } = product;

  const newOptions = { ...options, value: ratings}
  return (
    <Link className={styles.productCard} to={`/product/${_id}`} >
      <img src={images[0].url} alt={name} />
      <p>{name}</p>
      <div>
        <ReactStars {...newOptions} /> <span>{`(${numberOfReviews} Reviews )`}</span>
      </div>
      <span>₹{price}</span>
    </Link>
  )
}

export default ProductCard