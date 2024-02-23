import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/subscription';
import toast from 'react-hot-toast';
import logo from "../../assets/images/logo.png";

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const { error: courseError } = useSelector(state => state?.courses);
  const { loading, error, subscriptionId } = useSelector(state => state?.subscription);
  const [key, setKey] = useState('');

  const subscribeHandler = async () => {
    const { data: { key } } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    dispatch(buySubscription());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const paymentModal = () => {
        const options = {
          key,
          name: 'Code Crafters',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: "Code Crafters"
          },
          theme: {
            color: '#3182CE'
          }
        }
        const razor = new window.Razorpay(options);
        razor.open();
      }
      paymentModal();
    }
  }, [dispatch, error, user.name, user.email, key, subscriptionId, courseError]);

  return <Container p={'16'} height={'100vh'}>
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
        <Button isLoading={loading}  my={'8'} w={'full'} colorScheme={'blue'} onClick={subscribeHandler}>Purchase Now</Button>
      </Box>
      <Box bg={'blackAlpha.600'} p={'4'} css={{ borderRadius: '0 0 8px 8px' }}>
        <Heading color={'white'} size={'sm'} children={'100% refund at cancellation'} />
        <Text fontSize={'xs'} color={'white'} children={`*Terms & Conditions Apply`} />
      </Box>
    </VStack>
  </Container>
}

export default Subscribe