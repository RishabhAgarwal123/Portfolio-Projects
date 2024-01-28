import { Heading, HStack, VStack, Text, Button, Stack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount, loading }) => {
    return <>
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
            <Heading textAlign={['center', 'left']} maxW={'200px'} fontFamily={'sans-serif'} noOfLines={'3'} children={title} size={'sm'} />
            <Text children={description} noOfLines={'2'} />

            <HStack>
                <Text children={'Creator'} textTransform={'uppercase'} fontWeight={'bold'} />
                <Text children={creator} textTransform={'uppercase'} fontFamily={'body'} />
            </HStack>

            <Heading textAlign={'center'} size={'xs'} children={`Lectures - ${lectureCount}`} textTransform={'uppercase'} />
            <Heading size={'xs'} children={`Views - ${views}`} textTransform={'uppercase'} />

            <Stack direction={['column', 'row']} alignItems={'center'}>
                <Link to={`/course/${id}`}>
                    <Button colorScheme={'blue'}>Watch Now</Button>
                </Link>
                <Button isLoading={loading} colorScheme={'blue'} variant={'ghost'} onClick={() => addToPlaylistHandler(id)}>Add to playlist</Button>
            </Stack>
        </VStack>
    </>
}