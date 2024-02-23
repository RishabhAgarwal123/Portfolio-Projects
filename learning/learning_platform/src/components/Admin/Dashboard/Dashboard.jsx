import React, { useEffect } from 'react'
import { HStack, Heading, Box, Grid, Text, Stack, Progress } from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { FaSquare } from 'react-icons/fa';
import { DoughnutChart, LineChart } from './Chart';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getDashboardDetails } from '../../../redux/actions/admin';
import Loader from '../../Layout/Loader/Loader';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const dispatch = useDispatch();
    const {
        loading,
        error,
        message,
        stats,
        subscriptionCount,
        subscriptionIncreased,
        subscriptionPercentage,
        usersCount,
        usersIncreased,
        usersPercentage,
        viewsCount,
        viewsIncreased,
        viewsPercentage, } = useSelector(state => state.admin)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
        dispatch(getDashboardDetails());
    }, [dispatch, error, message]);

    return <Grid css={{ cursor: `url(${cursor}), default` }} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        {loading || !stats ? <Loader /> : <Box boxSizing={'border-box'} py={'16'} px={['4', '0']}>
            <Text mt={'5'} textAlign={'center'} opacity={'.5'} children={`Last change was on ${String(new Date(stats[11]?.createdAt)).split('G')[0]}`} />
            <Heading children={'Dashboard'} ml={['0', '16']} mb={'16'} textAlign={['center', 'left']} />
            <Stack direction={['column', 'row']} minH={'24'} justifyContent={'space-evenly'}>
                <CustomBox title={'Views'} qty={viewsCount} qtyPercen={viewsPercentage} profit={viewsIncreased} />
                <CustomBox title={'Users'} qty={usersCount} qtyPercen={usersPercentage} profit={usersIncreased} />
                <CustomBox title={'Subscription'} qty={subscriptionCount} qtyPercen={subscriptionPercentage} profit={subscriptionIncreased} />
            </Stack>
            <Box
                m={['0', '16']}
                borderRadius={'lg'}
                p={['0', '16']}
                mt={['4', '16']}
                boxShadow={'-2px 0 10px rgba(107, 70, 193, .5)'}
            >
                <Heading textAlign={['center', 'left']} size={'md'} children={'Views Graph'} pt={['8', '0']} ml={['0', '16']} />
                <LineChart views={stats?.map((stat) => stat?.views)} />
            </Box>
            <Grid templateColumns={['1fr', '2fr 1fr']}>
                <Box p={'4'}>
                    <Heading textAlign={['center', 'left']} size={'md'} children={'Progress Bar'} my={'8'} ml={['0', '16']} />
                    <Box>
                        <Bar title={'Views'} value={viewsPercentage} profit={viewsIncreased} />
                        <Bar title={'Users'} value={usersPercentage} profit={usersIncreased} />
                        <Bar title={'Subscription'} value={subscriptionPercentage} profit={subscriptionIncreased} />
                        <Box justifyContent={'center'} textAlign={'center'} display={'flex'}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <FaSquare color={'green'} /> <Text children={'Profit'} ml={'1'} />
                            </Box>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} ml={'1'}>
                                <FaSquare color={'red'} /> <Text children={'Loss'} ml={'1'} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box p={['0', '16']} boxSizing={'border-box'} py={'4'}>
                    <Heading textAlign={'center'} size={'md'} mb={'4'} children={'Users'} />
                    <DoughnutChart users={[subscriptionCount, usersCount - subscriptionCount]} />
                </Box>
            </Grid>
        </Box>}
        <Sidebar></Sidebar>
    </Grid>
}

export default Dashboard

function CustomBox({ title, qty, qtyPercen, profit }) {
    return <Box w={['full', '20%']} boxShadow={'-2px 0 10px rgba(107, 70, 193, .5)'} p={'8'} borderRadius={'lg'}>
        <Text children={title} />
        <HStack spacing={'6'}>
            <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
            <HStack>
                <Text children={`${qtyPercen}%`} />
                {profit ? <RiArrowUpLine color={'green'} /> : (
                    <RiArrowDownLine color={'red'} />
                )}
            </HStack>
        </HStack>
        <Text children={'Since Last Month'} opacity={'0.6'} />
    </Box>
}

function Bar({ title, value, profit }) {
    return <Box py={'4'} px={['0', '20']}>
        <Heading children={title} size={'sm'} mb={'2'} />
        <HStack w={'full'} alignItems={'center'}>
            <Text children={`${profit ? '0' : -value}%`} />
            <Progress w={'full'} value={value} colorScheme={`${profit ? 'green' : 'red'}`} />
            <Text children={`${value > 100 ? value : 100}%`} />
        </HStack>
    </Box>
}