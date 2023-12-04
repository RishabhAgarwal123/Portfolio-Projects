import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Subscribe = () => {
  return <Container h={'88vh'} p={'16'}>
    <Heading children={'Welcome'} m={'8'} textAlign={'center'} />
    <VStack boxShadow={'lg'} alignItems={'stretch'} borderRadius={'lg'} spacing={'0'}>
      <Box bg={'blue.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
        <Text color={'black'} children={`Pro Pack - ₹299.00`} />
      </Box>
      <Box p={'4'}>
        <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
          <Text children={`Join Pro Pack and Get Access to all content - ₹299.00`} />
          <Heading size={'md'} children={'₹299.00 Only'} />
        </VStack>
        <Button my={'8'} w={'full'} colorScheme={'blue'}>Purchase Now</Button>
      </Box>
      <Box bg={'blackAlpha.600'} p={'4'} css={{ borderRadius: '0 0 8px 8px' }}>
        <Heading color={'white'} size={'sm'} children={'100% refund at cancellation'} />
        <Text fontSize={'xs'} color={'white'} children={`*Terms & Conditions Apply`} />
      </Box>
    </VStack>
  </Container>
}

export default Subscribe