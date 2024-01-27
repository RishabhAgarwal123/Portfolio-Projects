import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.profile);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgetPassword(email));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, message, error]);

    return <Container h={'100vh'}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <Heading children={'Forget Password'} my={'16'} textAlign={['center', 'left']} />
            <VStack spacing={'16'}>
                <Input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={'example@email.com'}
                    focusBorderColor={'blue.500'}
                    type={'email'}
                />

                <Button isLoading={loading} type={'submit'} width={'full'} colorScheme={'blue'}>
                    Send Reset Link
                </Button>
            </VStack>
        </form>
    </Container>
}

export default ForgetPassword