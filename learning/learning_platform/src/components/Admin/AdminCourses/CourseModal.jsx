import React, { useState } from 'react'
import { Box, Text, Button, VStack, Input, Heading, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader, Grid, Stack } from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCSS } from '../../Auth/Register';

const CourseModal = ({ isOpen, onClose, id, deleteHandler, courseTitle, addLecture, lectures }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState('');
    const [videoPreview, setVideoPreview] = useState('');

    const closeModal = () => {
        setVideo('');
        setVideoPreview('');
        setTitle('');
        setDescription('');
        onClose();
    }

    const videoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setVideoPreview(reader.result);
            setVideo(file);
        }
    }

    return <Modal isOpen={isOpen} onClose={closeModal} size={'full'} scrollBehavior={'inside'}>
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
                        {lectures?.map((lecture, index) => {
                            return <VideoCard
                                key={index}
                                title={'React Intro'}
                                description={'Let get start with intro of react basics'}
                                num={index + 1}
                                lectureId={'fdgdfg'}
                                courseId={id}
                                deleteHandler={deleteHandler}
                            />
                        })}
                    </Box>
                    <Box>
                        <form onSubmit={(e) => addLecture(e, id, title, description, video)}>
                            <VStack spacing={'4'}>
                                <Heading children={'Add Lecture'} size={'md'} />
                                <Input
                                    required
                                    id='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder={'Course Title'}
                                    focusBorderColor={'purple.300'}
                                    type={'text'}
                                />
                                <Input
                                    required
                                    id='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={'Course Description'}
                                    focusBorderColor={'purple.300'}
                                    type={'text'}
                                />
                                <Input
                                    required
                                    accept="video/mp4"
                                    type={'file'}
                                    css={{ "&::file-selector-button": { ...fileUploadCSS, color: 'purple' } }}
                                    focusBorderColor={'purple.300'}
                                    onChange={videoHandler}
                                />
                                {videoPreview && <video src={videoPreview} controlsList={'nodownload'} controls>
                                </video>}
                                <Button w={'full'} colorScheme={'purple'} type={'submit'} >Add Lecture</Button>
                            </VStack>
                        </form>
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