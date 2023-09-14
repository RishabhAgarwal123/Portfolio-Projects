import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo.png';

const Footer = () => {
  return (
    <Box mt='80px' bgcolor='#fff3f4'>
      <Stack alignItems='center' px='40px' pt='24px'>
        <img src={Logo} alt={Logo} width='60px' height='40px' />
        <Typography variant='h5' pb='40px' mt='20px'>
          Made by RISHABH AGARWAL
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer