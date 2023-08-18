import {useRouter} from 'next/router';
import {Avatar, Box, Icon, IconButton, Typography} from '@mui/material';
import React from 'react';

interface ContactHeaderProps {
  data: IContact;
}

function ContactHeader({data}: ContactHeaderProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        paddingX: {xs: 2, md: 16},
        paddingY: {xs: 2, md: 4},
        backgroundColor: '#b2b2b2',
      }}
    >
      <IconButton onClick={() => router.back()}>
        <Icon>arrow_back</Icon>
      </IconButton>
      <Avatar
        src={data.image}
        sx={{
          width: {xs: 40, md: 80},
          height: {xs: 40, md: 80},
        }}
      />
      <Typography
        sx={{
          typography: {
            xs: 'h5',
            sm: 'h3',
          },
        }}
      >
        {data.name}
      </Typography>
    </Box>
  );
}

export default ContactHeader;
