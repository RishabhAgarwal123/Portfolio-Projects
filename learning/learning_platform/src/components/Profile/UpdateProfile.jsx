import React, { useState } from 'react'
import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { getMyProfile } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state?.profile);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);

    const updateHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email));
        dispatch(getMyProfile());
        navigate('/profile');
    }

    return <Container py={'16'} minH={'100vh'}>
        <form onSubmit={(e) => updateHandler(e)}>
            <Heading children={'Update Profile'} my={'16'} textAlign={['center', 'left']} />
            <VStack spacing={'8'}>
                <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={'Name'}
                    focusBorderColor={'blue.500'}
                    type={'text'}
                />
                <Input
                    required
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={'example@email.com'}
                    focusBorderColor={'blue.500'}
                    type={'email'}
                />
                <Button isLoading={loading} w={'full'} colorScheme={'blue'} type={'submit'}>Update Profile</Button>
            </VStack>
        </form>
    </Container>
}

export default UpdateProfile