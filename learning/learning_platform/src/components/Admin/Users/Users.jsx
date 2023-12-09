import React from 'react'
import { HStack, Heading, Box, Button, Grid, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const Users = () => {
  const users = [
    {
      _id: '1223423sdsdgfs',
      name: 'Rishabh',
      email: 'rish@gmail.com',
      role: 'Admin',
      subscription: {
        status: 'active'
      }
    },
    {
      _id: '1223423sdsdgfsdfdf',
      name: 'Rishi',
      email: 'rish@gmail.com',
      role: 'User',
      subscription: {
        status: 'Not Active'
      }
    },
    {
      _id: '1223423sdsdgfsadsds',
      name: 'Rishabh Agarwal',
      email: 'rishabh@gmail.com',
      role: 'Admin',
      subscription: {
        status: 'active'
      }
    },
  ];

  const updateHandler = (userId) => {
    console.log(userId)
  }

  const deleteHandler = (userId) => {
    console.log(userId)
  }

  return <Grid css={{ cursor: `url(${cursor}), default` }} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
    <Box p={['0', '10']} overflowX={'auto'}>
      <Heading children={'All Users'} my={'10'} textAlign={['center', 'left']} />
      <TableContainer w={['100vw', 'full']}>
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
              users?.map((user) => <Row row={user} key={user._id} updateHandler={updateHandler} deleteHandler={deleteHandler} />)
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
    <Sidebar></Sidebar>
  </Grid>
}

export default Users

function Row({ row, updateHandler, deleteHandler }) {
  const { _id, name, email, role, subscription } = row;
  return <Tr>
    <Td>#{_id}</Td>
    <Td>{name}</Td>
    <Td>{email}</Td>
    <Td>{role}</Td>
    <Td>{subscription?.status === 'active' ? 'Active' : 'Not Active'}</Td>
    <Td isNumeric>
      <HStack justifyContent={'flex-end'}>
        <Button onClick={() => updateHandler(_id)} variant={'outline'} color={'purple.500'}>Change Role</Button>
        <Button onClick={() => deleteHandler(_id)} color={'purple.600'}><RiDeleteBin7Fill /> </Button>
      </HStack>
    </Td>
  </Tr>
}