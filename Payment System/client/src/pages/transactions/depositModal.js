import React from 'react';
import { Modal, Form, message } from 'antd';
import StripeCheckout from 'react-stripe-checkout';
import { DepositFunds } from '../../apis/transactions';
import { useDispatch } from 'react-redux';
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'

const DepositModal = ({ showDepositModal, setShowDepositModal, reloadData }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onToken = async (token) => {
        try {
            dispatch(ShowLoader());
            console.log(token, form.getFieldValue('balance'))
            const payload = { ...token, balance: Number(form.getFieldValue('balance'))}
            const res = await DepositFunds(payload);
            if (res.data.success) {
                setShowDepositModal(false);
                message.success(res.data.message);
                reloadData();
            } else {
                dispatch(HideLoader());
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(HideLoader());
            message.error(error.message);
        }
    }

    return (
        <Modal
            title='Deposit'
            open={showDepositModal}
            onCancel={() => setShowDepositModal(false)}
            footer={null}>
            <div className='flex flex-col gap-1'>
                <Form layout='vertical'
                    form={form}
                    >
                    <Form.Item label='Balance' name='balance'
                        rules={[
                            {
                                required: true,
                                message: 'Please input balance'
                            }
                        ]}>
                        <input type='number' />
                    </Form.Item>
                </Form>
                <div className='flex justify-end'>
                    <button className='btn' style={{marginRight: '1rem'}} onClick={() => setShowDepositModal(false)}>Cancel</button>
                    <StripeCheckout
                        token={onToken}
                        currency='USD'
                        amount={form.getFieldValue('balance') * 100}
                        shippingAddress
                        stripeKey="pk_test_51Ng2NfSG70RDO3kS1lrEq9B5n2UKt94SwpHpXQQY0t0b9UMebO6rnSzCQHkbOaAt2rOH8Ygtcwsw4qCn1yaMmJGy00SDBLMUlk"
                    >
                        <button className='btn primaryBtn'>Deposit</button>
                    </StripeCheckout>
                </div>
            </div>
        </Modal>
    )
}

export default DepositModal