import React from 'react';
import styles from './Review.module.css';
import ReactStars from 'react-rating-stars-component';

const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true
}

const Review = ({ review }) => {
    const { name, rating, description} = review;
    const newOptions = {...options, value: rating}
    return (
        <div className={styles.card}>
            <div className={styles.cardContainer}>
                <img className={styles.cardImg} src='https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anBnfGVufDB8fDB8fHww&w=1000&q=80' alt='Imags' />
                <ReactStars {...newOptions} />
            </div>
            <div className={styles.cardDescrWrapper}>
                <div className={styles.cardTitleContainer}>
                    <p className={styles.cardTitle}>Review</p>
                    <p className={styles.reviewName}>- {name}</p>
                </div>
                <p className={styles.cardDescr}>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Review