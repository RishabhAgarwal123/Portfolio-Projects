import React, { useState } from 'react'
import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword(oldPassword, newPassword));
    } 

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
                <Button w={'full'} colorScheme={'blue'} type={'submit'}>Set New Password</Button>
            </VStack>
        </form>
    </Container>
}

export default ChangePassword