import { Container, Heading, VStack, Box, Input, FormLabel, Button, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    return <Container h={'100vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'10'}>
            <Heading children={'Get In Touch'} />
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
                    <FormLabel htmlFor='message' children={'Message'} />
                    <Textarea
                        required
                        id='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={'Write a query'}
                        focusBorderColor={'blue.500'}
                    />
                </Box>

                <Button my={'4'} type={'submit'} colorScheme={'blue'}> Send Request</Button>

                <Box my={'2'}>
                    Submit a Course Request? <Link to="/request">
                        <Button colorScheme={'blue'} variant={'link'} fontSize={'sm'}>
                            Click
                        </Button>
                    </Link> Here
                </Box>
            </form>
        </VStack>
    </Container>
}

export default Contact