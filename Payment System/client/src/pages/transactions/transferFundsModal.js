import React, { useState } from 'react';
import styles from './transferFundsModal.module.css';
import { Modal, Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TransferFunds, VerifyAccount } from '../../apis/transactions';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';
import { SetReloadUser } from '../../redux/userSlice';

const TransferFundsModal = (props) => {
    const { showTransferFundModal, setShowTransferFundModal, reloadData } = props;
    const [ isVerified, setIsVerified ] = useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)

    const verfiyAccount = async () => {
        try {
            dispatch(ShowLoader())
            const res = await VerifyAccount({
                receiver: form.getFieldValue('receiver')
            });
            if (res.data.success) { 
                setIsVerified('true')
            } else {
                setIsVerified('false');
            }
            dispatch(HideLoader());
        } catch (error) {
            dispatch(HideLoader());
            setIsVerified('false');
        }
    }

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoader());
            const payload = {
                ...values,
                sender: user._id,
                reference: values.reference || '',
                balance: Number(values.balance),
                status: 'success'
            }
            const res = await TransferFunds(payload);
            if (res.data.success) {
                setShowTransferFundModal(false);
                message.success(res.data.message);
                dispatch(SetReloadUser(true))
                reloadData();
            } else message.error(res.data.message);
            dispatch(HideLoader());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoader());
        }
    }

    return (
        <div>
            <Modal
                title='Transfer Funds'
                open={showTransferFundModal}
                onCancel={() => setShowTransferFundModal(false)}
                footer={null}
            >
                <Form layout='vertical' form={form} onFinish={onFinish}>
                    <div className='flex gap-1 items-center'>
                        <Form.Item label='Account Number' name='receiver' className='w-full'>
                            <input type='text' value='' />
                        </Form.Item>
                        <button className={`${styles.btn} ${styles.primaryBtn} mt-1`}
                            type='button'
                            onClick={() => verfiyAccount() }>
                            VERIFY
                        </button>
                    </div>
                    {isVerified === 'true' && <div className='success-bg'>Account Verified Successfully</div>}
                    {isVerified === 'false' &&<div className='error-bg'> Invalid Account</div>}
                    <Form.Item label='Amount' name='balance'
                        rules={[
                            { required: true, message: 'Please input your amount'},
                            { max: user.balance, message: 'Insufficient Balance'}
                        ]}
                    >
                        <input type='number' />
                    </Form.Item>
                    <Form.Item label='Reference' name='reference'>
                        <textarea type='text' />
                    </Form.Item>
                    
                    <div className='flex justify-end gap-1'>
                        <button className={styles.btn} onClick={() => setShowTransferFundModal(false)}> Cancel </button>
                        { isVerified === 'true' && 
                        <button className={`${styles.btn} ${styles.primaryBtn}`}>Transfer</button>}
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default TransferFundsModal