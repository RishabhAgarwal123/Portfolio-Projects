import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const params = useParams();
    console.log(params.token);

    return <Container h={'100vh'}>
        <form>
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

                <Button type={'submit'} width={'full'} colorScheme={'blue'}>
                    Reset Password
                </Button>
            </VStack>
        </form>
    </Container>
}

export default ResetPassword