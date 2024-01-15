import React, { useState } from 'react'
import { Avatar, useDisclosure, Button, Container, Heading, Stack, HStack, VStack, Text, Input, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileUploadCSS } from '../Auth/Register'
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../../redux/actions/profile'

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const removeFromPlaylist = (id) => {
    console.log(id);
  }

  const changeImageSubmitHandler = (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    
    myForm.append('file', image);

    dispatch(updateProfilePicture(myForm));
  }

  return <Container minH={'100vh'} maxW={'container.lg'} py={'8'}>
    <Heading children={'Profile'} m={'8'} />
    <Stack justifyContent={'flex-start'} direction={['column', 'row']} alignItems={'center'} spacing={['8', '16']} padding={'8'}>
      <VStack>
        <Avatar boxSize={'48'} src={user?.avatar?.url} />
        <Button colorScheme={'blue'} variant={'ghost'} onClick={onOpen}>Change Photo</Button>
      </VStack>

      <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
        <HStack>
          <Text children={'Name'} fontWeight={'bold'} />
          <Text children={user?.name} />
        </HStack>

        <HStack>
          <Text children={'Email'} fontWeight={'bold'} />
          <Text children={user?.email} />
        </HStack>

        <HStack>
          <Text children={'Date'} fontWeight={'bold'} />
          <Text children={user?.createdAt?.split('T')[0]} />
        </HStack>

        {user?.role !== 'Admin' && <HStack>
          <Text children={'Subscription'} fontWeight={'bold'} />
          {user?.subscription?.status === 'active'
            ? <Button color={'blue.500'} variant={'unstyled'}>Cancel Subscription</Button>
            : <Link to='/subscribe'>
              <Button colorScheme={'blue'}>Subscribe</Button>
            </Link>
          }
        </HStack>}

        <Stack direction={['column', 'row']} alignItems={'center'}>
          <Link to='/updateprofile'>
            <Button>Update Profile</Button>
          </Link>
          <Link to='/changepassword'>
            <Button>Change Password</Button>
          </Link>
        </Stack>
      </VStack>
    </Stack>

    <Heading children={'Playlist'} size={'md'} my={'8'} />
    {
      user?.playlist?.length !== 0 && <Stack direction={['column', 'row']} alignItems={'center'} flexWrap='wrap' p={'4'}>
        {
          user?.playlist?.map((item) => {
            return <VStack w={'48'} m={'2'} key={item.course}>
              <Image boxSize={'full'} objectFit={'contain'} src={item.poster} />
              <HStack>
                <Link to={`/course/${item.course}`}>
                  <Button variant={'ghost'} colorScheme={'blue'}>Watch Now</Button>
                </Link>

                <Button onClick={() => removeFromPlaylist(item.course)}>
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          })
        }
      </Stack>
    }

    <ChangeProfilePic isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler} />
  </Container>
}

export default Profile;

function ChangeProfilePic({ isOpen, onClose, changeImageSubmitHandler }) {
  const [imagePreview, setImagePreview] = useState('');
  const [image, setImage] = useState('');

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    }
  }

  const closeModal = () => {
    onClose();
    setImagePreview('');
    setImage('');
  }

  return <Modal isOpen={isOpen} onClose={closeModal}>
    <ModalOverlay backdropFilter={'blur(10px)'} />
    <ModalContent>
      <ModalHeader>Change Profile Picture</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Container>
          <form onSubmit={(e) => changeImageSubmitHandler(e, image)}>
            <VStack spacing={'8'}>
              {imagePreview && <Avatar src={imagePreview} boxSize={'48'} />}
              <Input
                accept="image/*"
                type={'file'}
                css={{ "&::file-selector-button": fileUploadCSS }}
                onChange={imageHandler}
              />
              <Button w={'full'} colorScheme={'blue'} type={'submit'}>Change</Button>
            </VStack>
          </form>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button mr={'3'} onClick={closeModal}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}