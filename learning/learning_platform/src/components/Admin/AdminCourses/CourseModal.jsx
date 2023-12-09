import React from 'react'
import { Box, Text, Button, Heading, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader, Grid, Stack } from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const CourseModal = ({ isOpen, onClose, id, deleteHandler, courseTitle, addLecture, lectures }) => {
    const closeModal = () => {
        onClose();
    }

    return <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay backdropFilter={'blur(10px)'} />
        <ModalContent>
            <ModalHeader>{courseTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody p={'16'}>
                <Grid templateColumns={['1fr', '3fr 1fr']}>
                    <Box px={['0', '16']}>
                        <Box my={'5'}>
                            <Heading children={courseTitle} />
                            <Heading children={`#${id}`} size={'sm'} opacity={'0.4'} />
                        </Box>
                        <Heading children={'Lectures'} size={'lg'} />
                        <VideoCard
                            title={'React Intro'}
                            description={'Let get start with intro of react basics'}
                            num={1}
                            lectureId={'fdgdfg'}
                            courseId={id}
                            deleteHandler={deleteHandler}
                        />
                    </Box>
                </Grid>
            </ModalBody>
            <ModalFooter>
                <Button mr={'3'} onClick={closeModal}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

export default CourseModal

function VideoCard({ title, description, num, lectureId, courseId, deleteHandler }) {
    return <Stack direction={['column', 'row']} my={'8'} borderRadius={'lg'} boxShadow={'0 0 10px rgba(107, 70, 193, 0.5)'}
        justifyContent={['flex-start', 'space-between']} p={['4', '8']}
    >
        <Box>
            <Heading size={'sm'} children={`#${num} ${title}`} />
            <Text children={description} />
        </Box>
        <Button color={'purple.600'} onClick={() => deleteHandler(courseId, lectureId)}>
            <RiDeleteBin7Fill />
        </Button>
    </Stack>
}