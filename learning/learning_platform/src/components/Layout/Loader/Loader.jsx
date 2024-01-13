import { VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

const Loader = ({ color = 'blue.500' }) => {
    return <VStack h={'100vh'} justifyContent={'center'}>
        <div style={{ transform: 'scale(4'}}>
            <Spinner size={'xl'} thickness={'2px'} speed={'0.65s'} emptyColor={'transparent'} color={color}></Spinner>
        </div>
    </VStack>
}

export default Loader