import React, { useState } from 'react'
import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return <Container py={'16'} minH={'100vh'}>
        <form >
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
                <Button w={'full'} colorScheme={'blue'} type={'submit'}>Update Profile</Button>
            </VStack>
        </form>
    </Container>
}

export default UpdateProfile