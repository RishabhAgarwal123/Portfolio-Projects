import React from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Link, useSearchParams } from 'react-router-dom';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference');

  return <Container h={'90vh'} p={'16'}>
    <Heading my={'8'} textAlign={'center'}>
      You have Pro Pack
    </Heading>
    <VStack boxShadow={'lg'} pb={'16'} alignItems={'center'} borderRadius={'lg'}>
      <Box w={'full'} bgColor={'blue.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
        <Text color={'black'}>Payment Success</Text>
      </Box>
      <Box p={'4'}>
        <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
          <Text>Congratulations! You've unlocked Pro membership, granting access to exclusive premium content.</Text>
          <Heading size={'4xl'}>
            <RiCheckboxCircleFill />
          </Heading>
        </VStack>
      </Box>
      <Link to='/profile'>
        <Button variant={'ghost'}>
          Explore profile
        </Button>
      </Link>
      <Heading size={'xs'}>Reference: {reference}</Heading>
    </VStack>
  </Container>
}

export default PaymentSuccess