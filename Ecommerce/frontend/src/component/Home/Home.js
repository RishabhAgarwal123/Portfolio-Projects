import React from 'react'
import { CgMouse } from 'react-icons/cg';
import styles from './Home.module.css';
import Product from '../Product/Product';

const product = {
    name: 'T-Shirt',
    images: [
        { url: 'https://static.massimodutti.net/3/photos/2023/I/0/1/p/6823/540/251/6823540251_1_1_3.jpg?t=1692628511551'}
    ],
    price: '23212',
    _id: 'Any id',
    reviews: 25
}

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
        <h1 className={styles.homeHeading} id='container'>Featured Prodcuts</h1>

        <div className={styles.container}>
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
        </div>
    </>
  )
}

export default Home