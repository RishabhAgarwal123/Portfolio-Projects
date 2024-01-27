import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { error, loading, message } = useSelector(state => state.profile);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params?.token, password));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
            navigate('/login');
        }
    }, [dispatch, message, error, navigate]);

    return <Container h={'100vh'}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <Heading children={'Reset Password'} my={'16'} textAlign={['center', 'left']} />
            <VStack spacing={'16'}>
                <Input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={'Create a new password'}
                    focusBorderColor={'blue.500'}
                    type={'password'}
                />

                <Button isLoading={loading} type={'submit'} width={'full'} colorScheme={'blue'}>
                    Reset Password
                </Button>
            </VStack>
        </form>
    </Container>
}

export default ResetPassword