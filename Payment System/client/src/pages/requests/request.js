import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/pageTitle';
import { Table, Tabs, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import RequestModal from './requestModal';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';
import { GetAllRequestsByUser, UpdateRequestStatus } from '../../apis/requests';
import moment from 'moment';
import { SetReloadUser } from '../../redux/userSlice';

const { TabPane } = Tabs;

function Request() {
  const [data, setData] = useState([]);
  const [newRequestModal, setNewRequestModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const updateStatus = async (record, status) => {
    try {
      console.log(record, user)
      if (status === 'Accepted' && record.balance < user.balance) {
        dispatch(ShowLoader());
        const res = await UpdateRequestStatus({
          ...record,
          status
        });
        if (res.data.success) {
          message.success(res.data.message);
          getAllRequestsByUser();
          dispatch(SetReloadUser(true));
        } else message.error(res.data.message);
        dispatch(HideLoader());
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoader());
    }
  }

  const columns = [
    { title: 'Request Id', dataIndex: '_id' },
    { title: 'Sender', dataIndex: 'sender',},
    { title: 'Receiver', dataIndex: 'receiver' },
    // { title: 'Sender', 
    //   dataIndex: 'sender', 
    //   render(sender) {
    //     return sender.lastName + " " +sender.firstName
    //   }},
    // { title: 'Receiver', dataIndex: 'receiver', 
    // render(receiver) {
    //   return receiver.lastName + " " +receiver.firstName
    // } },
    { title: 'Amount', dataIndex: 'balance' },
    { title: 'Date', dataIndex: 'date', render: (text, record) => moment(record.createdAt).format('DD-MM-YYY hh:mm:ss A') },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Action', dataIndex: 'action', render: (text, record) => {
      if (record.status === 'Pending' && record.receiver === user._id) {
        return <div className='flex gap-1'>
          <h1 className='text-sm underline' onClick={() => updateStatus(record, 'Accepted')}>Accept</h1>
          <h1 className='text-sm underline' onClick={() => updateStatus(record, 'Rejected')}>Reject</h1>
        </div>
      }
    } }
  ];

  const getAllRequestsByUser = async () => {
    try {
      dispatch(ShowLoader());
      const res = await GetAllRequestsByUser();
      if (res.data.success) {
        const sentData = res.data.data?.filter((item) => item.sender === user._id);
        const receiverData = res.data.data?.filter((item) => item.receiver === user._id);

        setData({
          sendRequest: sentData,
          receivedRequest: receiverData
        });

      }
      dispatch(HideLoader());
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getAllRequestsByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex justify-between'>
        <PageTitle title='Request' />
        <button className='btn' style={{ width: '10rem' }} onClick={() => setNewRequestModal(true)} >
          Request Funds
        </button>
      </div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Request Sent' key='1'>
          <Table columns={columns} dataSource={data.sendRequest} />
        </TabPane>
        <TabPane tab='Request Received' key='2'>
        <Table columns={columns} dataSource={data.receivedRequest} />
        </TabPane>
      </Tabs>
      {
        newRequestModal && <RequestModal
          newRequestModal={newRequestModal}
          setNewRequestModal={setNewRequestModal}
          reloadData={getAllRequestsByUser}
        />
      }
    </>
  )
}

export default Request