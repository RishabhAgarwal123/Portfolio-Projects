import { Container, VStack, Heading, Input, Box, FormLabel, Button, Avatar } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

export const fileUploadCSS = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#A0AEC0',
    backgroundColor: 'white'
}

const fileUploadStyles = {
    "&::file-selector-button": fileUploadCSS
}

const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const imageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePreview(reader.result);
            setImage(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        console.log(name, image);

        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('password', password);
        myForm.append('file', image);

        console.log(myForm);
        dispatch(register(myForm));
    };

    return <Container h={'100vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'10'}>
            <Heading children={'Become A Member'} />
            <form onSubmit={(e) => handleSubmit(e)} style={{ width: '100%' }}>
                <Box my={'4'} display={'flex'} justifyContent={'center'}>
                    <Avatar src={imagePreview} size={'2xl'} />
                </Box>

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

                <Box my={'4'}>
                    <FormLabel htmlFor='chooseAvatar' children={'Choose Avatar'} />
                    <Input
                        accept="image/*"
                        required
                        id='chooseAvatar'
                        focusBorderColor={'blue.500'}
                        type={'file'}
                        css={fileUploadStyles}
                        onChange={imageHandler}
                    />
                </Box>

                <Button my={'4'} type={'submit'} colorScheme={'blue'}> Sign Up</Button>

                <Box my={'2'}>
                    Already a member? <Link to="/login">
                        <Button colorScheme={'blue'} variant={'link'} fontSize={'sm'}>
                            Sign In
                        </Button>
                    </Link> Here
                </Box>
            </form>
        </VStack>
    </Container>
}

export default Register