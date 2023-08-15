import React, { useState } from 'react';
import styles from './transferFundsModal.module.css';
import { Modal, Form } from 'antd';

const TransferFundsModal = (props) => {
    const { showTransferFundModal, setShowTransferFundModal } = props;
    const { isVerified, setIsVerified } = useState(false);
    const [form] = Form.useForm();

    const verfiy = async () => {

    }

    return (
        <div>
            <Modal
                title='Transfer Funds'
                open={showTransferFundModal}
                onCancel={() => setShowTransferFundModal(false)}
                footer={null}
            >
                <Form layout='vertical' form={form}>
                    <div className='flex gap-1 items-center'>
                        <Form.Item label='Account Number' name='Receiver' className='w-full'>
                            <input type='text' />
                        </Form.Item>
                        <button className={`${styles.btn} ${styles.primaryBtn} mt-1`}
                            type='button'
                            onClick={() => verfiy }>
                            VERIFY
                        </button>
                    </div>
                    {isVerified && <div>
                        <h1 className='text-sm'>Account Verified</h1>
                    </div>}
                    <Form.Item label='Amount' name='amount'>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <textarea type='text' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TransferFundsModal