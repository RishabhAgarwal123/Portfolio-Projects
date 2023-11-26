import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, VStack, HStack } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SideLinks = ({ url = '/', title = 'Home' }) => {
    return <Link to={url}>
        <Button variant={'ghost'}>
            {title}
        </Button>
    </Link>
}

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isAuthenticated, setIsAuthenticated] = useState(false);

    return <>
        <ColorModeSwitcher />
        <Button
            onClick={onOpen}
            colorScheme={'blue'}
            height={'12'}
            width={'12'}
            top={'6'}
            left={'6'}
            rounded='full'
            position={'fixed'}>
            <RiMenu5Fill />
        </Button>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay backdropFilter={'blur(3px)'} />
            <DrawerContent>
                <DrawerHeader borderBottomWidth={'1px'}>CODE CRAFTERS</DrawerHeader>
                <DrawerBody>
                    <VStack spacing={'4'} alignItems={'flex-start'}>
                        <SideLinks url='/' title='Home' />
                        <SideLinks url='/courses' title='Browse Learning Paths' />
                        <SideLinks url='/request' title='Submit Course Request' />
                        <SideLinks url='/contact' title='Get In Touch' />
                        <SideLinks url='/about' title='Discover Our Story' />

                        <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>
                            {
                                isAuthenticated ? (
                                    <>
                                        
                                    </>
                                ): (
                                    <>
                                        <Link to='/login'>
                                            <Button colorScheme={'blue'}>Sign In</Button>
                                        </Link>
                                        <p>OR</p>
                                        <Link to='/register'>
                                            <Button colorScheme={'blue'}>Sign Up</Button>
                                        </Link>
                                    </>
                                )
                            }
                        </HStack>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
}

export default Header