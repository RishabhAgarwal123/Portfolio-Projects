import React from 'react'
import { Container, VStack, Heading, Input, Box, FormLabel, Button, Grid } from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';

const CreateCourse = () => {
  return <Grid css={{cursor: `url(${cursor}), default`}} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
  <Box >

  </Box>
  <Sidebar></Sidebar>
</Grid>
}

export default CreateCourse