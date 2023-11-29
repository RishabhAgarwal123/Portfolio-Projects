import React from 'react'
import { Stack, VStack, HStack, Heading, Text, Button, Image, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy} from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import VectorImage from '../../assets/images/bg1.png';
import './home.css';

const Home = () => {
  return (
    <section className='home'>

      <div className='container'>
        <Stack
          direction={['column', 'row']}
          height='100%'
          justifyContent={['center', 'space-between']}
          alignItems='center'
          spacing={['16', '56']}
        >
          <VStack width={'full'} alignItems={['center', 'flex-end']} spacing={'5'}>
            <Heading children='GAIN EXPERT INSIGHTS' size={'2xl'}></Heading>
            <Text fontSize={'1xl'} fontFamily='cursive' textAlign={[ 'center', 'left' ]} children='Unlocking Knowledge, Empowering Minds: Your Gateway to Lifelong Learning'></Text>
            <Link to='/courses'>
              <Button size={'lg'} colorScheme={'blue'}>
                Get Started
              </Button>
            </Link>
          </VStack>

          <Image className='vector-graphics' boxSize={'md'} src={VectorImage} objectFit={'contain'}></Image>
        </Stack>
      </div>

      <Box padding={'8'} bg={'blackAlpha.900'}>
        <Heading textAlign={'center'} fontFamily={'body'} color={'blue.400'} children='BRAND PORTFOLIO'></Heading>
        <HStack className='brands' justifyContent={'space-evenly'} marginTop={'4'}>
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className='container2'>
        <video 
          autoPlay 
          controls 
          src='' 
          controlsList='nodownload nofullscreen noremoteplayback'
          disablePictureInPicture
          disableRemotePlayback
          ></video>
      </div>
    </section>
  )
}

export default Home