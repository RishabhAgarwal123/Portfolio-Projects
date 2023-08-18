import React from 'react'
import PageTitle from '../../components/pageTitle';
import { ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { UpdateUser } from '../../apis/users';
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../../redux/userSlice';

const Profile = () => {
    const [form] = Form.useForm();
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const updateUser = async (values) => {
        const data = {
            ...user,
            ...values
        }
        try {
            dispatch(ShowLoader());
            const res = await UpdateUser(data);
            if (res.data.success) {
                dispatch(SetUser(res.data.data));
                message.success(res.data.message);
            }
            dispatch(HideLoader());
        } catch (error) {
            dispatch(HideLoader());
            message.error(error.message);
        }
    }

    return (
        <div>
            <PageTitle title='User Profile' />
            <Form form={form} layout='vertical' initialValues={user} style={{ marginTop: '1rem' }} onFinish={updateUser}>
                <Form.Item label='First Name' name='firstName' className='w-full'>
                    <input type='text' />
                </Form.Item>
                <Form.Item label='Last Name' name='lastName' className='w-full'>
                    <input type='text' />
                </Form.Item>
                <Form.Item label='Email' name='email' className='w-full'>
                    <input type='email' />
                </Form.Item>
                <Form.Item label='Phone Number' name='phone' className='w-full'>
                    <input type='number' />
                </Form.Item>
                <Form.Item label='Address' name='address' className='w-full'>
                    <input type='text' />
                </Form.Item>
                <button className='btn primaryBtn' >Update</button>
            </Form>
        </div>
    )
}

export default Profile