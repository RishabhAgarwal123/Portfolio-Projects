import React, { useState } from 'react'
import { Container, Heading, Input, HStack, Text, Button, Stack } from '@chakra-ui/react';
import { Course } from './Course';

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

const Courses = () => {
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');

    const addToPlaylistHandler = (id) => {
        console.log(id);
    }

    return <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
        <Heading children='Courses Catalog' m={'8'} />
        <Input
            type={'text'}
            placeholder='Search a course...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            name='keyword'
        />

        <HStack overflowX={'auto'} paddingY={'8'} css={{
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}>
            {
                categories?.map((category, index) => <Button key={index} onClick={() => setCategory(category)} minW={'60'}>
                    <Text children={category} />
                </Button>)
            }
        </HStack>

        <Stack
            direction={['column', 'row']}
            flexWrap={'wrap'}
            justifyContent={['flex-start', 'space-evenly']}
            alignItems={['center', 'flex-start']}
        >
            <Course
                title={'Sample'}
                description={'Sample'}
                views={45}
                imageSrc={'https://cdn.pixabay.com/photo/2020/05/05/12/12/coffee-5132832_1280.jpg'}
                id={'Sample'}
                creator={'Smaple Again'}
                lectureCount={5}
                addToPlaylistHandler={addToPlaylistHandler}
            />
        </Stack>
    </Container>
}

export default Courses