import styles from './Loader.module.css';

import React from 'react'

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.hand}>
                <div className={styles.finger}></div>
                <div className={styles.finger}></div>
                <div className={styles.finger}></div>
                <div className={styles.finger}></div>
                <div className={styles.tree}></div>
                <div className={styles.thumb}></div>
            </div>
        </div>
    )
}

export default Loader