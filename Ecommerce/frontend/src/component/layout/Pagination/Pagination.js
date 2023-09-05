import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav className={styles.pagination}>
            <ul className={styles.paginationList}>
                <li>
                    <button
                        className={styles.paginationButton}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Prev
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className={styles.paginationItem}>
                        <button
                            className={`${styles.paginationButton} ${currentPage === number ? styles.active : ''
                                }`}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className={styles.paginationButton}
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
