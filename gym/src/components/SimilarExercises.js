import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';

const SimilarExercises = ({targetMuscles, equipments}) => {
  return (
    <Box
      sx={{
        marginTop: {
          lg: '100px',
          xs: '0'
        }
      }}
      p='20px'
    >
      <Typography variant='h3' mb={5}>Exercises that target the same muscle group</Typography>
      <Stack direction='row' sx={{p: '2', position: 'relative'}}>
        {
          targetMuscles.length ? <HorizontalScrollbar data={targetMuscles} /> : <Loader /> 
        }
      </Stack>
      <Typography variant='h3' mb={5} mt={4}>Exercises that use the same equipment</Typography>
      <Stack direction='row' sx={{p: '2', position: 'relative'}}>
        {
          equipments.length ? <HorizontalScrollbar data={equipments} /> : <Loader /> 
        }
      </Stack>
    </Box>
  )
}

export default SimilarExercises