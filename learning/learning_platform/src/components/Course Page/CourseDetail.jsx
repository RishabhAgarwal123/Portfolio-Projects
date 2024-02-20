import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';

const CourseDetail = ({ user }) => {
  const { lectures, loading } = useSelector(state => state?.courses);
  const params = useParams();
  const dispatch = useDispatch();
  const [lectureNumber, setLectureNumber] = useState(0);

  useEffect(() => {
    dispatch(getCourseLectures(params?.id));
  }, [dispatch, params?.id]);

  if (user.role !== 'admin' && (user.subscription === undefined || user.subscription.status !== 'active')) {
    return <Navigate to="/subscribe"></Navigate>
  }

  return loading ? <Loader /> : <Grid minH={'100vh'} templateColumns={['1fr', '3fr 1fr']}>
    <Box>
      <video
        width={'100%'}
        controls
        controlsList='nodownload noremoteplayback'
        disablePictureInPicture
        disableRemotePlayback
        src={(lectures && lectures?.length > 0) ? lectures[lectureNumber]?.video?.url : ''}
      ></video>

      {lectures && lectures?.length > 0 && <Heading children={`#${lectureNumber + 1} ${lectures[lectureNumber]?.title}`} m={'4'} />}
      <Heading children={'Description'} m={'4'} />
      {lectures && lectures?.length > 0 && <Text m={'4'}>
        {lectures[lectureNumber]?.desciption}
      </Text>}
    </Box>

    {
      lectures && lectures?.length > 0 ?
        (<VStack>
          {
            lectures?.map((lecture, index) => {
              return <button
                onClick={() => setLectureNumber(index)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  maring: 0,
                  borderBottom: '1px solid #000000'
                }}
                key={lecture._id}>
                <Text noOfLines={1}>
                  {
                    `#${index + 1} ${lecture?.title}`
                  }
                </Text>
              </button>
            })
          }
        </VStack>) : <Heading textAlign={'center'} children="No lectures" />
    }
  </Grid>
}

export default CourseDetail