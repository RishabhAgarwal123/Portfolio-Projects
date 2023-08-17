import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/pageTitle';
import styles from './transactions.module.css';
import { Table, message } from 'antd';
import TransferFundsModal from './transferFundsModal';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';
import { GetTransactionsDetails } from '../../apis/transactions';
import moment from 'moment';
import DepositModal from './depositModal';

function Transactions() {
    const [showTransferFundModal, setShowTransferFundModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const dispatch = useDispatch();
    const [data = [], setData] = useState([]);
    const { user } = useSelector(state => state.user)

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => moment(record.createdAt).format('DD-MM-YYY hh:mm:ss A')
        },
        {
            title: 'Transactio ID',
            dataIndex: '_id'
        },
        {
            title: 'Amount',
            dataIndex: 'balance'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (text, record) => {
                if (record.sender._id === record.receiver._id) return 'Deposit';
                else if (record.sender._id === user._id) return 'Debit';
                else return 'Credit';
            }
        },
        {
            title: 'Reference Account',
            dataIndex: '',
            render: (text, record) => {
                // return record.sender === user._id ? <div>
                //     <h1 className='text-sm'>{ record.receiver.firstName } { record.receiver.lastName }</h1>
                // </div> :
                //     <div>
                //         <h1 className='text-sm'>{ record.sender.firstName } { record.sender.lastName }</h1>
                //     </div>
                return record.sender === user._id ? record.receiver : record.sender;
            }
        },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        }
    ];

    const getTransactionData = async () => {
        try {
            dispatch(ShowLoader());
            const res = await GetTransactionsDetails();
            if (res.data.success) {
                setData(res.data.data);
            }
            dispatch(HideLoader());
        } catch (error) {
            dispatch(HideLoader());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getTransactionData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <PageTitle title='Transactions' />
                <div className='flex gap-1'>
                    <button className={styles.btn} 
                        onClick={() => setShowDepositModal(true)}>
                        Deposit
                    </button>
                    <button className={`${styles.btn} ${styles.primaryBtn}`}
                        onClick={() => setShowTransferFundModal(true)}>
                        Transfer
                    </button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowKey='key' style={{ marginTop: '20px' }} />
            {showTransferFundModal && <TransferFundsModal
                showTransferFundModal={showTransferFundModal}
                reloadData={getTransactionData}
                setShowTransferFundModal={setShowTransferFundModal} />}
            {showDepositModal && <DepositModal 
                showDepositModal={showDepositModal} 
                reloadData={getTransactionData}
                setShowDepositModal={setShowDepositModal}
            />}
        </div>
    )
}

export default Transactions