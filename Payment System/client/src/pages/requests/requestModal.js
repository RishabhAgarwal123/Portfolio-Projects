import { Form, Modal, message } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';
import {  SendRequest } from '../../apis/requests';
import { VerifyAccount } from '../../apis/transactions';

const RequestModal = (props) => {
    const { newRequestModal, setNewRequestModal, reloadData } = props;
    const [isVerified, setIsVerified] = useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)

    const verifyAccount = async () => {
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
                reference: values.description || '',
                balance: Number(values.balance),
                status: 'success'
            }
            const res = await SendRequest(payload);
            if (res.data.success) {
                setNewRequestModal(false);
                message.success(res.data.message);
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
                open={newRequestModal}
                onCancel={() => setNewRequestModal(false)}
                footer={null}
            >
                <Form layout='vertical' form={form} onFinish={onFinish}>
                    <div className='flex gap-1 items-center'>
                        <Form.Item label='Account Number' name='receiver' className='w-full'>
                            <input type='text' value='' />
                        </Form.Item>
                        <button className={`btn primaryBtn mt-1`}
                            type='button'
                            onClick={() => verifyAccount()}>
                            VERIFY
                        </button>
                    </div>
                    {isVerified === 'true' && <div className='success-bg'>Account Verified Successfully</div>}
                    {isVerified === 'false' && <div className='error-bg'> Invalid Account</div>}
                    <Form.Item label='Amount' name='balance'
                        rules={[
                            { required: true, message: 'Please input your amount' },
                            { max: user.balance, message: 'Insufficient Balance' }
                        ]}
                    >
                        <input type='number' />
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <textarea type='text' />
                    </Form.Item>

                    <div className='flex justify-end gap-1'>
                        <button className='btn' onClick={() => setNewRequestModal(false)}> Cancel </button>
                        {isVerified === 'true' &&
                            <button className={`btn primaryBtn`}>Request</button>}
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default RequestModal