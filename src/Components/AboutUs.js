import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
//import paint from '../../static/images/pexels-pixabay.jpg';
import { styles, Img } from '../styles/styles.js';

const AboutUs = () => {
  return (
    <Box sx={styles.aboutUsContainer}>
      <Grid container spacing={6} sx={styles.gridContainer}>
        <Grid item xs={12} md={5}>
          <Img src='../static/images/pexels-pixabay.jpg' alt='Paint' />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant='h3' fontWeight={700} sx={styles.title}>
            Make money. Save time
          </Typography>
          <Typography sx={styles.aboutUsSubtitle}>
            {/* With us, you can easily explore various
          categories such as freelance work, tutoring, pet sitting, event
          staffing, and much more. Our extensive network of trusted employers
          ensures that you'll find legitimate and rewarding opportunities that fit
          your skills and schedule.  */}
            Introducing a versatile platform that caters to both job posters and job seekers, this company provides a convenient space for users to post and accept random side jobs. It serves as a go-to resource for individuals seeking additional income opportunities, facilitating the seamless connection between those in need of assistance and those eager to take on extra hustle.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            sx={{ width: '200px', fontSize: '16px' }}
          >
            Contact Us
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;