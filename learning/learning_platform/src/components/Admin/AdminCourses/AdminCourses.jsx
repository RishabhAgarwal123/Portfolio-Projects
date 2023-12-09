import React from 'react'
import {
  HStack, Heading, Box, Button, Grid, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Image, useDisclosure
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';

const AdminCourses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const courses = [
    {
      _id: '1223423sdsdgfs',
      title: 'JavaScript Course',
      category: 'Web Development',
      createdBy: 'Rishabh',
      poster: {
        url: 'https://cdn.pixabay.com/photo/2020/05/05/12/12/coffee-5132832_1280.jpg'
      },
      views: 500,
      numOfVideos: 50
    },
    {
      _id: '1223423sdsdgfsdfdf',
      title: 'Angular Course',
      category: 'Web Development',
      createdBy: 'Rishabh',
      poster: {
        url: 'https://cdn.pixabay.com/photo/2020/05/05/12/12/coffee-5132832_1280.jpg'
      },
      views: 100,
      numOfVideos: 40
    },
    {
      _id: '1223423sdsdgfsadsds',
      title: 'React Course',
      category: 'Web Development',
      createdBy: 'Agarwal',
      poster: {
        url: 'https://cdn.pixabay.com/photo/2020/05/05/12/12/coffee-5132832_1280.jpg'
      },
      views: 200,
      numOfVideos: 45
    },
  ];

  const courseHandler = (userId) => {
    console.log(userId);
    onOpen();
  }

  const deleteHandler = (userId) => {
    console.log(userId)
  }

  const deleteLectureHandler = (courseId, lectureId) => {
    console.log(courseId, lectureId);
  }

  const lectureHandler = (e, courseId, title, description, video ) => {
    e.preventDefault();
    console.log(courseId);
  }

  return <Grid css={{ cursor: `url(${cursor}), default` }} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
    <Box p={['0', '8']} overflowX={'auto'}>
      <Heading children={'All Users'} my={'10'} textAlign={['center', 'left']} />
      <TableContainer w={['100vw', 'full']}>
        <Table variant={'simple'} size={'lg'}>
          <TableCaption>All Available Courses</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Poster</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Creator</Th>
              <Th isNumeric>Views</Th>
              <Th isNumeric>Lectures</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              courses?.map((course) => <Row row={course} key={course._id} courseHandler={courseHandler} deleteHandler={deleteHandler} />)
            }
          </Tbody>
        </Table>
      </TableContainer>
      <CourseModal
        addHandler={lectureHandler}
        deleteHandler={deleteLectureHandler}
        isOpen={isOpen}
        id={'wggdhhd'}
        courseTitle={'React'}
        lectures={[]}
        onClose={onClose} />
    </Box>
    <Sidebar></Sidebar>
  </Grid>
}

export default AdminCourses

function Row({ row, courseHandler, deleteHandler }) {
  const { _id, title, poster, category, createdBy, views, numOfVideos } = row;
  return <Tr>
    <Td>#{_id}</Td>
    <Td>
      <Image src={poster?.url} />
    </Td>
    <Td>{title}</Td>
    <Td>{category}</Td>
    <Td>{createdBy}</Td>
    <Td isNumeric>{views}</Td>
    <Td isNumeric>{numOfVideos}</Td>

    <Td isNumeric>
      <HStack justifyContent={'flex-end'}>
        <Button onClick={() => courseHandler(_id)} variant={'outline'} color={'purple.500'}>View Lectures</Button>
        <Button onClick={() => deleteHandler(_id)} color={'purple.600'}><RiDeleteBin7Fill /> </Button>
      </HStack>
    </Td>
  </Tr>
}