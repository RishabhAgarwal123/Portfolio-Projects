import React, { useEffect, useState } from 'react'
import { Container, VStack, Heading, Input, Select, Image, Button, Grid } from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { fileUploadCSS } from '../../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';

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

const CreateCourse = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(state => state?.admin);
  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', courseTitle);
    myForm.append('description', description);
    myForm.append('createdBy', createdBy);
    myForm.append('category', category);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return <Grid css={{ cursor: `url(${cursor}), default` }} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
    <Container py={'8'}>
      <form onSubmit={handleSubmit}>
        <Heading children={'Create Course'} my={'10'} textAlign={['center', 'left']} />
        <VStack m={'auto'} spacing={'4'}>
          <Input
            id='title'
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder={'Course Title'}
            focusBorderColor={'purple.300'}
            type={'text'}
          />
          <Input
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={'Course Description'}
            focusBorderColor={'purple.300'}
            type={'text'}
          />
          <Input
            id='createdBy'
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            placeholder={'Course Creator'}
            focusBorderColor={'purple.300'}
            type={'text'}
          />
          <Select focusBorderColor={'purple.300'} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value={''}>Select Category</option>
            {
              categories?.map((category, index) => {
                return <option value={category} key={index}>{category}</option>
              })
            }
          </Select>
          <Input
            required
            accept="image/*"
            type={'file'}
            css={{ "&::file-selector-button": { ...fileUploadCSS, color: 'blue' } }}
            focusBorderColor={'blue.300'}
            onChange={imageHandler}
          />
          {imagePreview && <Image src={imagePreview} boxSize={'64'} objectFit={'contain'} />}

          <Button isLoading={loading} colorScheme={'blue'} type={'submit'} w={'full'}>Create</Button>
        </VStack>
      </form>
    </Container>
    <Sidebar></Sidebar>
  </Grid>
}

export default CreateCourse