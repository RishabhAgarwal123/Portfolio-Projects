import { Container, Heading, VStack, Box, Input, FormLabel, Button, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { contactUs } from '../../redux/actions/other';

const Contact = () => {
    const dispatch = useDispatch();
    const { loading, error, message: errorMessage } = useSelector(state => state.other);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(contactUs(name, email, message));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (errorMessage) {
            toast.success(errorMessage);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, errorMessage]);

    return <Container h={'100vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'10'}>
            <Heading children={'Get In Touch'} />
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                        <Button isLoading={loading} colorScheme={'blue'} variant={'link'} fontSize={'sm'}>
                            Click
                        </Button>
                    </Link> Here
                </Box>
            </form>
        </VStack>
    </Container>
}

export default Contact