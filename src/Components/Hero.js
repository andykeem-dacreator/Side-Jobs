import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
//import team from '../static/images/pexels-fauxels.jpg';

import { styles, Img } from '../styles/styles.js';

const Hero = () => {
  return (
    <Box sx={styles.heroBox}>
      <Grid container spacing={6} sx={styles.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant='h3' fontWeight={700} sx={styles.title}>
            Transform your daily work
          </Typography>
          <Typography variant='h6' sx={styles.subtitle}>
            Looking to earn extra money on the side? Or looking to offload your everyday work to someone else? Look no further. Side Jobs is your go-to destination for unlocking new adventures and financial possibilities.
          </Typography>

        </Grid>
        <Grid item xs={12} md={5}>
          <Img src='../static/images/pexels-fauxels-3184358.jpg' alt='Team' />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;