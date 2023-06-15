import React from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import SanitizerOutlinedIcon from '@mui/icons-material/SanitizerOutlined';
import { styles } from '../styles/styles.js';

const AboutStatSection = () => {
  const sectionItems = [
    {
      id: 1,
      icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      stat: '700,000',
      sentence: 'shopping trips made',
    },
    {
      id: 2,
      icon: <SanitizerOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      stat: '50,000',
      sentence: 'homes scrubbed squeaky clean',
    },
    {
      id: 3,
      icon: <PetsOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      stat: '3,000',
      sentence: 'dogs and a llama walked',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container sx={styles.sectionGridContainer}>
        {sectionItems.map((item) => {
          return (
            <Grid
              item
              xs={12}
              md={3.5}
              minHeight={300}
              key={item.id}
              sx={styles.sectionGridItem}
            >
              <Stack direction="column" sx={{ alignItems: 'center' }}>
                {item.icon}
                <br />
                <Typography variant="h5" fontWeight="bold">
                  {item.stat}
                </Typography>
                <Typography>{item.sentence}</Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AboutStatSection;
