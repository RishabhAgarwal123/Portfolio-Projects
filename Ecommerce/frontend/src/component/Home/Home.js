import React from 'react'
import { CgMouse } from 'react-icons/cg';
import styles from './Home.module.css';
import Product from '../Product/Product';

const Home = () => {
  return (
    <>
        <div className={styles.banner}>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href='#container'>
                <button>
                    Scroll <CgMouse />
                </button>
            </a>
        </div>
        <h1 className={styles.homeHeading}>Featured Prodcuts</h1>

        <div className={styles.container} id='container'>
            <Product product={'hello'} />
        </div>
    </>
  )
}

export default Home