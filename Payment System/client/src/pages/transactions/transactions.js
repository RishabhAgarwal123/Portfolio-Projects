import React, { useState } from 'react';
import PageTitle from '../../components/pageTitle';
import styles from './transactions.module.css';
import { Table } from 'antd';
import TransferFundsModal from './transferFundsModal';

function Transactions() {
    const [showTransferFundModal, setShowTransferFundModal] = useState(false);
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date'
        },
        {
            title: 'Transactio ID',
            dataIndex: 'transactionId'
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
                    <button className={`${styles.btn} ${styles.primaryBtn}`} 
                    onClick={() => setShowTransferFundModal(true)}>
                        Transfer
                    </button>
                </div>
            </div>
            <Table columns={columns} dataSource={[]} style={{marginTop: '20px'}} />
            {showTransferFundModal && <TransferFundsModal 
                    showTransferFundModal={showTransferFundModal} 
                    setShowTransferFundModal={setShowTransferFundModal} />}
        </div>
    )
}

export default Transactions