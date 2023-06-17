import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
//import team from '../static/images/pexels-fauxels.jpg';

import { styles, Img } from '../styles/styles.js';

const Hero = () => {
  return (
    <Box sx={styles.heroBox}>
      <Grid container spacing={6} sx={styles.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} sx={styles.title}>
            Transform your daily work
          </Typography>
          <Typography variant="h6" sx={styles.subtitle}>
            Introducing a versatile platform that caters to both job posters and
            job seekers, this company provides a convenient space for users to
            post and accept random side jobs. It serves as a go-to resource for
            individuals seeking additional income opportunities, facilitating
            the seamless connection between those in need of assistance and
            those eager to take on extra hustle.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Img src="../static/images/pexels-fauxels-3184358.jpg" alt="Team" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
