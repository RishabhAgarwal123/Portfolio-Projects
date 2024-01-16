import React, { useEffect, useState } from 'react'
import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.profile);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword(oldPassword, newPassword));
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

    return <Container py={'16'} minH={'100vh'}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <Heading children={'Change Password'} my={'16'} textAlign={['center', 'left']} />
            <VStack spacing={'8'}>
                <Input
                    required
                    id='oldPassword'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder={'Enter Old Password'}
                    focusBorderColor={'blue.500'}
                    type={'password'}
                />
                <Input
                    required
                    id='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={'Enter New Password'}
                    focusBorderColor={'blue.500'}
                    type={'password'}
                />
                <Button isLoading={loading} w={'full'} colorScheme={'blue'} type={'submit'}>Set New Password</Button>
            </VStack>
        </form>
    </Container>
}

export default ChangePassword