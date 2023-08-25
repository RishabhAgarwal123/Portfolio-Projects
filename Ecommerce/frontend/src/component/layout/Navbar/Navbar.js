/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faUser, faUserPlus, faShoppingCart, faContactBook, faInfoCircle, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

const Navbar = () => {
    const cartCount = 2; // Set your cart count value here

    return (
        <nav className={`${styles.navbar} ${styles.sticky}`}>
            <div className={styles.logo}>
                ECommerce
            </div>
            <ul className={styles.navLinks}>
                <li><a href="#"><FontAwesomeIcon icon={faHome} /> Home</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faBoxOpen} /> Product</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faContactBook} /> Contact</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faInfoCircle} /> About</a></li>
            </ul>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Search" />
                <button href=''><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <div className={styles.userActions}>
                <a href="#"><FontAwesomeIcon icon={faUser} /> Login</a>
                <a href="#"><FontAwesomeIcon icon={faUserPlus} /> Sign Up</a>
                <a href="#">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className={styles.cartCount}>{cartCount}</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
