import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const CourseDetail = () => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const lectures = [
    {
      _id: 'testgjdhcys', title: 'Sample 1', desciption: 'Sample Description 1', video: {
        url: 'Tempurl'
      }
    },
    {
      _id: 'testgjdhcydf', title: 'Sample 2', desciption: 'Sample Description 2', video: {
        url: 'Tempurl'
      }
    },
    {
      _id: 'testgjdhcsdsads', title: 'Sample 3', desciption: 'Sample Description 3', video: {
        url: 'Tempurl'
      }
    },
    {
      _id: 'testgjdhcadfsdfys', title: 'Sample 4', desciption: 'Sample Description 4', video: {
        url: 'Tempurl'
      }
    },
  ]

  return <Grid minH={'100vh'} templateColumns={['1fr', '3fr 1fr']}>
    <Box>
      <video
        width={'100%'}
        controls
        src=''
        controlsList='nodownload noremoteplayback'
        disablePictureInPicture
        disableRemotePlayback
      ></video>

      <Heading children={`#${lectureNumber + 1} ${lectures[lectureNumber]?.title}`} m={'4'} />

      <Heading children={'Description'} m={'4'} />
      <Text m={'4'}>
        {lectures[lectureNumber]?.desciption}
      </Text>
    </Box>

    <VStack>
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
    </VStack>
  </Grid>
}

export default CourseDetail