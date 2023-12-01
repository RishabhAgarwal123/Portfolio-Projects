import { Container, Heading, VStack, Box, Input, FormLabel, Button, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Request = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');

    return <Container h={'100vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'10'}>
            <Heading children={'Request New Course'} />
            <form style={{ width: '100%' }}>
                <Box my={'4'}>
                    <FormLabel htmlFor='name' children={'Name'} />
                    <Input
                        required
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={'Example'}
                        focusBorderColor={'blue.500'}
                        type={'text'}
                    />
                </Box>

                <Box my={'4'}>
                    <FormLabel htmlFor='email' children={'Email Address'} />
                    <Input
                        required
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'example@email.com'}
                        focusBorderColor={'blue.500'}
                        type={'email'}
                    />
                </Box>

                <Box my={'4'}>
                    <FormLabel htmlFor='course' children={'Course Details'} />
                    <Textarea
                        required
                        id='course'
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder={'Provide a course description'}
                        focusBorderColor={'blue.500'}
                    />
                </Box>

                <Button my={'4'} type={'submit'} colorScheme={'blue'}> Send Course Request</Button>

                <Box my={'2'}>
                    See Available Courses! <Link to="/courses">
                        <Button colorScheme={'blue'} variant={'link'} fontSize={'sm'}>
                            Click
                        </Button>
                    </Link> Here
                </Box>
            </form>
        </VStack>
    </Container>
}

export default Request