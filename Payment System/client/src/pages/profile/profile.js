import React from 'react'
import PageTitle from '../../components/pageTitle';
import { Form } from 'antd';

const Profile = () => {
    const [form] = Form.useForm()
  return (
    <div>
        <PageTitle title='User Profile' />
        <Form form={form} style={{ marginTop: '1rem' }}>

        </Form>
    </div>
  )
}

export default Profile