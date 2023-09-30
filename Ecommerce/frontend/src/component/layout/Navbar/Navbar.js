/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faShoppingCart, faContactBook, faInfoCircle, faBoxOpen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useSearch } from '../../utils/SearchContext';
import { useSelector } from 'react-redux';
import UserActions from '../../Account/UserActions';

const Navbar = () => {
    const { user, authenticated } = useSelector(state => state.user);
    const cartCount = 2; // Set your cart count value here
    const { searchText, setSearch } = useSearch();

    const handleSearch = (query) => {
        setSearch(query);
    }

    return (
        <nav className={`${styles.navbar} ${styles.sticky}`}>
            <div className={styles.logo}>
                <h1>ECommerce</h1>
            </div>
            <div >
                <Link to={'/'} className={styles.icons}><FontAwesomeIcon icon={faHome} /> <span>Home</span></Link>
                <Link to={'/products'} className={styles.icons}><FontAwesomeIcon icon={faBoxOpen} /> <span>Product</span></Link>
                <Link to={'/contact'} className={styles.icons}><FontAwesomeIcon icon={faContactBook} /> <span>Contact</span></Link>
                <Link to={'/about'} className={styles.icons}><FontAwesomeIcon icon={faInfoCircle} /> <span>About</span></Link>
            </div>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchText || ''}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }} />
                <button href=''><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <div className={styles.userActions}>
                {authenticated && <UserActions user={user} />}
                {/* <Link to={'/logout'}><FontAwesomeIcon icon={faRightFromBracket} /> <span>Log Out</span></Link>
                <Link to={'/cart'}><FontAwesomeIcon icon={faShoppingCart} />
                    <span className={styles.cartCount}>{cartCount}</span>
                </Link> */}

            </div>
        </nav>
    );
}

export default Navbar;
