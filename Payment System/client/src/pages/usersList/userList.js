import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';
import { Table, message } from 'antd';
import { GetUserList, UpdateVerificationStatus } from '../../apis/users';
import PageTitle from '../../components/pageTitle';

const UserList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState();

  const updateStatus = async (record, isVerified) => {
    try {
      dispatch(ShowLoader());
      const res = await UpdateVerificationStatus({
        selectedUser: record._id,
        isVerified
      });
      if (res.data.success) {
        message.success(res.data.message);
        getUsers();
      } else message.error(res.data.message)
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  }

  const getUsers = async () => {
    try {
      dispatch(ShowLoader());
      const res = await GetUserList();
      if (res.data.success) {
        setUsers(res.data.data);
      } else message.error(res.data.message);
      dispatch(HideLoader());
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  }

  const columns = [
    { title: 'First Name', dataIndex: 'firstName'},
    { title: 'Last Name', dataIndex: 'lastName'},
    { title: 'Email', dataIndex: 'email'},
    { title: 'Mobile Number', dataIndex: 'phone'},
    { title: 'Verification Status', dataIndex: 'isVerified', render: (text, record) => text ? 'Verified' : 'Not Verified'},
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return <div className='flex gap-1'>
          {
            record.isVerified ? (
              <button className='btn' onClick={() => updateStatus(record, false)}>Suspend</button>
            ): (
              <button className='btn' onClick={() => updateStatus(record, true)}>Activate</button>
            )
          }
        </div>
      }
    }
  ]

  useEffect(() => {
    getUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageTitle title='Users' />
      <Table columns={columns} dataSource={users} style={{marginTop: '20px'}}/>
    </div>
  )
}

export default UserList