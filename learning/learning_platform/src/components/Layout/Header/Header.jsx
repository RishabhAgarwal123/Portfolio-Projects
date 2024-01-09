import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, VStack, HStack } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLoginBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const SideLinks = ({ url = '/', title = 'Home', onClose }) => {
    return <Link to={url} onClick={onClose}>
        <Button variant={'ghost'}>
            {title}
        </Button>
    </Link>
}

const Header = ( { isAuthenticated = false, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        onClose();
    }

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
            zIndex={'overlay'}
            position={'fixed'}>
            <RiMenu5Fill />
        </Button>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay backdropFilter={'blur(1px)'} />
            <DrawerContent>
                <DrawerHeader borderBottomWidth={'1px'}>CODE CRAFTERS</DrawerHeader>
                <DrawerBody>
                    <VStack spacing={'4'} alignItems={'flex-start'}>
                        <SideLinks onClose={onClose} url='/' title='Home' />
                        <SideLinks onClose={onClose} url='/courses' title='Browse Learning Paths' />
                        <SideLinks onClose={onClose} url='/request' title='Submit Course Request' />
                        <SideLinks onClose={onClose} url='/contact' title='Get In Touch' />
                        <SideLinks onClose={onClose} url='/about' title='Discover Our Story' />

                        <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>
                            {
                                isAuthenticated ? (
                                    <>
                                        <VStack>
                                            <HStack>
                                                <Link onClick={onClose} to='/profile'>
                                                    <Button variant={'ghost'} colorScheme={'blue'}>Profile</Button>
                                                </Link>
                                                <Button variant={'ghost'} onClick={handleLogout}>
                                                    <RiLoginBoxLine />
                                                    Logout
                                                </Button>
                                            </HStack>
                                            {
                                                user && user?.role === 'admin' && <Link onClick={onClose} to='/admin/dashboard'>
                                                    <Button colorScheme={'purple'} variant={'ghost'}>
                                                        <RiDashboardFill style={{ margin: '4px' }} />
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                            }
                                        </VStack>
                                    </>
                                ) : (
                                    <>
                                        <Link onClick={onClose} to='/login'>
                                            <Button colorScheme={'blue'}>Sign In</Button>
                                        </Link>
                                        <p>OR</p>
                                        <Link onClick={onClose} to='/register'>
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