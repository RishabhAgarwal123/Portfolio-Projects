import React from 'react'
import { HStack, Heading, Box, Grid, Text, Stack, Progress } from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { FaSquare } from 'react-icons/fa';
import { DoughnutChart, LineChart } from './Chart';

const Dashboard = () => {
    return <Grid css={{ cursor: `url(${cursor}), default` }} minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Box boxSizing={'border-box'} py={'16'} px={['4', '0']}>
            <Text textAlign={'center'} opacity={'.5'} children={`Last change was on ${String(new Date()).split('G')[0]}`} />
            <Heading children={'Dashboard'} ml={['0', '16']} mb={'16'} textAlign={['center', 'left']} />
            <Stack direction={['column', 'row']} minH={'24'} justifyContent={'space-evenly'}>
                <CustomBox title={'Views'} qty={'123'} qtyPercen={30} profit={true} />
                <CustomBox title={'Users'} qty={'33'} qtyPercen={50} profit={true} />
                <CustomBox title={'Subscription'} qty={'36'} qtyPercen={20} profit={false} />
            </Stack>
            <Box
                m={['0', '16']}
                borderRadius={'lg'}
                p={['0', '16']}
                mt={['4', '16']}
                boxShadow={'-2px 0 10px rgba(107, 70, 193, .5)'}
            >
                <Heading textAlign={['center', 'left']} size={'md'} children={'Views Graph'} pt={['8', '0']} ml={['0', '16']} />
                <LineChart />
            </Box>
            <Grid templateColumns={['1fr', '2fr 1fr']}>
                <Box p={'4'}>
                    <Heading textAlign={['center', 'left']} size={'md'} children={'Progress Bar'} my={'8'} ml={['0', '16']} />
                    <Box>
                        <Bar title={'Views'} value={130} profit={true} />
                        <Bar title={'Users'} value={50} profit={true} />
                        <Bar title={'Subscription'} value={20} profit={false} />
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
                    <DoughnutChart />
                </Box>
            </Grid>
        </Box>
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