import { Container, VStack, Heading, Input, Box, FormLabel, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return <Container h={'100vh'}>
    <VStack h={'full'} justifyContent={'center'} spacing={'10'}>
      <Heading children={'Hello, CODE CRAFTERS Community!'} />
      <form onSubmit={(e) => submitHandler(e)} style={{ width: '100%' }}>
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
          <FormLabel htmlFor='password' children={'Password'} />
          <Input
            required
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Enter Password'}
            focusBorderColor={'blue.500'}
            type={'password'}
          />
        </Box>

        <Box>
          <Link to="/forgetpassword">
            <Button variant={'link'} fontSize={'sm'}>
              Forget Password ?
            </Button>
          </Link>
        </Box>

        <Button my={'4'} type={'submit'} colorScheme={'blue'}> Sign In</Button>

        <Box my={'2'}>
          New User? <Link to="/register">
            <Button colorScheme={'blue'} variant={'link'} fontSize={'sm'}>
              Sign Up
            </Button>
          </Link> Here
        </Box>
      </form>
    </VStack>
  </Container>
}

export default Login