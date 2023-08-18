import {Grid, Typography} from '@mui/material';
import React from 'react';

interface PersonalInfoSectionProps {
  data: IContact;
}

function PersonalInfoSection({data}: PersonalInfoSectionProps) {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#e3e2e2',
        width: '100%',
        paddingX: 4,
        paddingY: 2,
        rowGap: 2,
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography>Status: {data.status}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Gender: {data.gender}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Location: {data.location.name}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Origin: {data.origin.name}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Species: {data.species}</Typography>
      </Grid>
    </Grid>
  );
}

export default PersonalInfoSection;
