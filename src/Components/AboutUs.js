import React from 'react';
import { Grid, Typography, Button, Box, Dialog, DialogContent } from '@mui/material';
import { styles, Img } from '../styles/styles.js';
import Login from './Login';

const AboutUs = () => {
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  
  return (
    <>
    <Box sx={styles.aboutUsContainer}>
      <Grid container spacing={6} sx={styles.gridContainer}>
        <Grid item xs={12} md={5}>
          <Img src="../static/images/pexels-pixabay.jpg" alt="Paint" />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} sx={styles.title}>
            Make money. Save time
          </Typography>
          <Typography sx={styles.aboutUsSubtitle}>
            With us, you can easily explore various
            categories such as freelance work, tutoring, pet sitting, event
            staffing, and much more. Our extensive network of trusted employers
            ensures that you'll find legitimate and rewarding opportunities that fit
            your skills and schedule. 
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
            onClick={() => setOpenLoginDialog(true)}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={openLoginDialog}
      onClose={() => setOpenLoginDialog(false)}
    >
      <DialogContent>
        <Login defaultForm={true}/>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default AboutUs;
