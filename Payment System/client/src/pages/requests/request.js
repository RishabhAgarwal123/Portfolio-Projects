import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/pageTitle';
import { Table, Tabs, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import RequestModal from './requestModal';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';
import { GetAllRequestsByUser } from '../../apis/requests';
import moment from 'moment';

const { TabPane } = Tabs;

function Request() {
  const [data, setData] = useState([]);
  const [newRequestModal, setNewRequestModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)

  const columns = [
    { title: 'Request Id', dataIndex: '_id' },
    { title: 'Sender', dataIndex: 'sender',},
    { title: 'Receiver', dataIndex: 'receiver' },
    // { title: 'Sender', dataIndex: 'sender', render: (text, record) => `${record.sender.lastName} ${record.sender.firstName}`},
    // { title: 'Receiver', dataIndex: 'receiver', render: (text, record) => `${record.receiver.lastName} ${record.receiver.firstName}` },
    { title: 'Amount', dataIndex: 'balance' },
    { title: 'Date', dataIndex: 'date', render: (text, record) => moment(record.createdAt).format('DD-MM-YYY hh:mm:ss A') },
    { title: 'Status', dataIndex: 'status' }
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