import React from 'react';
import PageTitle from '../../components/pageTitle';
import styles from './transactions.module.css';

function Transactions() {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date'
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        }
    ]
    return (
        <div>
            <div className='flex justify-between items-center'>
                <PageTitle title='Transactions' />
                <div className='flex gap-1'>
                    <button className={styles.btn}>
                        Deposit
                    </button>
                    <button className={`${styles.btn} ${styles.primaryBtn}`}>
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Transactions