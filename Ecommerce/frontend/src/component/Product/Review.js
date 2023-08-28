import React from 'react';
import styles from './Review.module.css';

const Review = () => {
  return (
    <div className={styles.card}>
    <div className={styles.cardImg}></div>
    <div className={styles.cardDescrWrapper}>
      <p className={styles.cardTitle}>Project</p>
      <p className={styles.cardDescr}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque blanditiis nemo fugit autem possimus, magnam 
        consequatur sint esse.
      </p>
    </div>
</div>
  )
}

export default Review