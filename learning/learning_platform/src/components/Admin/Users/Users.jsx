import React, { useEffect } from 'react'
import { HStack, Heading, Box, Button, Grid, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllUsers, updateUserRole, deleteUser } from '../../../redux/actions/admin';

const Users = () => {
  const dispatch = useDispatch();
  const { loading, error, message, users } = useSelector(state => state?.admin);

  const updateHandler = async (userId) => {
    await dispatch(updateUserRole(userId));
    dispatch(getAllUsers());
  }

  const deleteHandler = async (userId) => {
    await dispatch(deleteUser(userId));
    dispatch(getAllUsers());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  return <Grid css={{ cursor: `url(${cursor}), default` }} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
    <Box p={['0', '10']} overflowX={'auto'}>
      <Heading children={'All Users'} my={'10'} textAlign={['center', 'left']} />
      {users?.length !== 0 ? <TableContainer w={['100vw', 'full']}>
        <Table variant={'simple'} size={'lg'}>
          <TableCaption>All Available Users</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Subcription</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              users && users?.map((user) => <Row loading={loading} row={user} key={user._id} updateHandler={updateHandler} deleteHandler={deleteHandler} />)
            }
          </Tbody>
        </Table>
      </TableContainer> : <Heading children={'No Users Available'} my={'10'} textAlign={['center']} />}
    </Box>
    <Sidebar></Sidebar>
  </Grid>
}

export default Users

function Row({ row, updateHandler, deleteHandler, loading }) {
  const { _id, name, email, role, subscription } = row;
  return <Tr>
    <Td>#{_id}</Td>
    <Td>{name}</Td>
    <Td>{email}</Td>
    <Td>{role?.toUpperCase()}</Td>
    <Td>{subscription?.status === 'active' ? 'ACTIVE' : 'NOT ACTIVE'}</Td>
    <Td isNumeric>
      <HStack justifyContent={'flex-end'}>
        <Button isLoading={loading} onClick={() => updateHandler(_id)} variant={'outline'} color={'blue.500'}>Change Role</Button>
        <Button isLoading={loading} onClick={() => deleteHandler(_id)} color={'blue.600'}><RiDeleteBin7Fill /> </Button>
      </HStack>
    </Td>
  </Tr>
}