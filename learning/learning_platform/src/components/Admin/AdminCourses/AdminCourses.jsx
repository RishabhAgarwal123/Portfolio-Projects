import React, { useEffect, useState } from 'react'
import {
  HStack, Heading, Box, Button, Grid, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Image, useDisclosure
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';
import { createLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';

const AdminCourses = () => {
  const dispatch = useDispatch();
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { courses, lectures } = useSelector(state => state?.courses);
  const { loading, error, message } = useSelector(state => state?.admin);

  const courseHandler = (courseId, title) => {
    setCourseId(courseId);
    setCourseTitle(title)
    dispatch(getCourseLectures(courseId));
    onOpen();
  }

  const deleteHandler = (courseId) => {
    dispatch(deleteCourse(courseId));
  }

  const deleteLectureHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  }

  const lectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(createLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
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
    dispatch(getAllCourses());
  }, [dispatch, error, message]);

  return <Grid css={{ cursor: `url(${cursor}), default` }} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
    <Box p={['0', '8']} overflowX={'auto'}>
      <Heading children={'All Courses'} my={'10'} textAlign={['center', 'left']} />
      {courses?.length !== 0 ? <TableContainer w={['100vw', 'full']}>
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
              courses?.map((course) => <Row loading={loading} row={course} key={course._id} courseHandler={courseHandler} deleteHandler={deleteHandler} />)
            }
          </Tbody>
        </Table>
      </TableContainer>: <Heading children={'No Courses Available'} my={'10'} textAlign={['center']} />}
      <CourseModal
        addLecture={lectureHandler}
        deleteHandler={deleteLectureHandler}
        isOpen={isOpen}
        id={courseId}
        courseTitle={courseTitle}
        lectures={lectures}
        onClose={onClose}
        loading={loading}
      />
    </Box>
    <Sidebar></Sidebar>
  </Grid>
}

export default AdminCourses

function Row({ row, courseHandler, deleteHandler, loading }) {
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
        <Button isLoading={loading} onClick={() => courseHandler(_id, title)} variant={'outline'} color={'blue.500'}>View Lectures</Button>
        <Button isLoading={loading} onClick={() => deleteHandler(_id)} color={'blue.600'}><RiDeleteBin7Fill /> </Button>
      </HStack>
    </Td>
  </Tr>
}