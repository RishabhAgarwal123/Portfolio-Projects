import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import { TiSocialLinkedinCircular, TiSocialInstagramCircular } from 'react-icons/ti';
import { DiGithubBadge } from "react-icons/di";

const Footer = () => {
    return <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
        <Stack direction={['column', 'row']}>
            <VStack alignItems={['center', 'flex-start']} width={'full'}>
                <Heading children='All Rights Reserved' color={'white'} />
                <Heading children='@ Rishabh Agarwal' color={'blue.400'} fontFamily={'body'} fontSize={'sm'} />
            </VStack>

            <HStack spacing={['2', '10']} justifyContent={'center'} fontSize={'50'}>
                <a href={'www.linkedin.com/in/rishi8a69127'} target={'blank'}>
                    <TiSocialLinkedinCircular style={{ color: '#ffffff', backgroundColor: '#0077B5' }} />
                </a>
                <a href={'https://www.instagram.com/rishabh404agarwal/'} target={'blank'}>
                    <TiSocialInstagramCircular style={{ color: '#ffffff', background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }} />
                </a>
                <a href={'https://github.com/RishabhAgarwal123'} target={'blank'}>
                    <DiGithubBadge style={{ color: '#ffffff', backgroundColor: '#333333' }} />
                </a>
            </HStack>

        </Stack>
    </Box>
}

export default Footer