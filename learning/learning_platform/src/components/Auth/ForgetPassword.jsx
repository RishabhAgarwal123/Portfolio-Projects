import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    return <Container h={'100vh'}>
        <form>
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

                <Button type={'submit'} width={'full'} colorScheme={'blue'}>
                    Send Reset Link
                </Button>
            </VStack>
        </form>
    </Container>
}

export default ForgetPassword