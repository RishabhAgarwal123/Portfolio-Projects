import { Avatar, Box, Button, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { RiSecurePaymentFill } from 'react-icons/ri'
import React from 'react'
import { Link } from 'react-router-dom'
import termsAndCondition from '../../assets/docs/termsAndCondition';

const Founder = () => {
    return <Stack direction={['column', 'row']} spacing={['4', '8']} padding={'8'}>
        <VStack>
            <Avatar boxSize={['40', '48']} src={'https://avatars.githubusercontent.com/u/41911876?s=400&u=3d414a317707dce453c9ab6db04564e67da13313&v=4'}></Avatar>
            <Text children={'Founder'} opacity={'0.5'} />
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center', 'flex-start']} marginLeft={['0', '12']}>
            <Heading children={'Rishabh Agarwal'} size={['md', 'xl']} />
            <Text children={`Hi, I am a Full Stack Developer.
            Our misson is to provide quality content at reasonable price.`} textAlign={['center', 'left']} />
        </VStack>
    </Stack>
}

const VideoPlayer = () => {
    return <Box maxW={'container.lg'}>
        <video
            style={{ width: '100%', height: '70%' }}
            autoPlay
            controls
            src=''
            controlsList='nodownload nofullscreen noremoteplayback'
            disablePictureInPicture
            disableRemotePlayback
            muted
        ></video>
    </Box>
}

const TermsAndConditions = ({ termsAndCondition }) => {
    return <Box >
        <Heading size={'md'} my={'4'} children={'Terms & Conditions'} textAlign={'center', 'left'} />
        <Box h={'sm'} p={'4'} overflow={'scroll'}>
            <Text textAlign={['center', 'left']} letterSpacing={'widest'} fontFamily={'heading'}>
                {termsAndCondition}
            </Text>
            <Heading my={'4'} size={'xs'} children={'Refund only applicable for cancellation with in 7 days.'} />
        </Box>
    </Box>
}

const About = () => {
    return (
        <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
            <Heading children={'Disover Our Story'} textAlign={['center', 'left']} />
            <Founder />
            <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
                <Text fontFamily={'cursive'} m={'2'} textAlign={['center', 'left']}>
                    A premium learning platform offering top-notch courses for skill mastery within a user-friendly interface. Elevate your expertise with our curated selection of high-quality content.
                </Text>
                <Link to='/subscribe'>
                    <Button variant={'ghost'} colorScheme={'blue'}>
                        Check Out Our Plans
                    </Button>
                </Link>
            </Stack>

            <VideoPlayer />

            <TermsAndConditions termsAndCondition={termsAndCondition} />

            <HStack my={'4'} p={'4'}>
                <RiSecurePaymentFill />
                <Heading size={'xs'} fontFamily={'sans-serif'} children={'Payment is secured by Razorpay'} />
            </HStack>
        </Container>
    )
}

export default About