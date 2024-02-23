import React, { useEffect, useState } from 'react'
import { Container, Heading, Input, HStack, Text, Button, Stack } from '@chakra-ui/react';
import { Course } from './Course';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader/Loader';
import { addToPlaylist } from '../../redux/actions/profile';
import { getMyProfile } from '../../redux/actions/user';

const categories = [
    'Data Structures & Algorithms',
    'Mobile App Development',
    'Game Development',
    'Web Development',
    'Data Structures & Algorithms',
    'Mobile App Development',
    'Game Development',
    'Web Development'
]

const Courses = () => {
    const dispatch = useDispatch();
    const { loading, courses, error, message } = useSelector(state => state.courses);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');

    const addToPlaylistHandler = async (id) => {
        await dispatch(addToPlaylist(id));
        dispatch(getMyProfile());
    }

    useEffect(() => {
        dispatch(getAllCourses(category, keyword));

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [category, keyword, dispatch, error, message]);

    return loading ? <Loader /> : <Container minH={'100vh'} mt={'8'} maxW={'container.lg'} paddingY={'8'}>
        <Heading children='Courses Catalog' m={'8'} />
        <Input
            type={'text'}
            placeholder='Search a course...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            name='keyword'
        />

        <HStack overflowX={'auto'} paddingY={'8'} css={{
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}>
            {
                categories?.map((category, index) => <Button key={index} onClick={() => setCategory(category)} minW={'60'}>
                    <Text children={category} />
                </Button>)
            }
        </HStack>

        <Stack
            direction={['column', 'row']}
            flexWrap={'wrap'}
            justifyContent={['flex-start', 'space-evenly']}
            alignItems={['center', 'flex-start']}
        >
            {
                courses?.length > 0 ? courses?.map((course) => (
                    <Course
                        addToPlaylistHandler={addToPlaylistHandler}
                        creator={course?.createdBy}
                        description={course?.description}
                        id={course?._id}
                        imageSrc={course?.poster?.url}
                        key={course?._id}
                        lectureCount={course?.numOfVideos}
                        title={course?.title}
                        views={course?.views}
                        loading={loading}
                    />
                )): <Heading children={'No Courses Found!'} opacity={'0.5'} mt={'4'} />
            }
        </Stack>
    </Container>
}

export default Courses