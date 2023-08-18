import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import PageInfo from '@/components/pageInfo';
import Link from 'next/link';

function Index() {
  return (
    <>
      <PageInfo title="SleekFlow Web Frontend Developer Task" description="Author: Por Wei Kang" />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#dadada',
            padding: '2rem',
            borderRadius: '1rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5">
            SleekFlow
            <br />
            Web Frontend Developer Task
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'gray',
            }}
          >
            by Por Wei Kang
          </Typography>

          <Button
            variant="contained"
            component={Link}
            href="/contact"
            sx={{
              marginTop: '1rem',
              backgroundColor: '#63636f',
              '&:hover': {
                backgroundColor: '#747482',
              },
            }}
          >
            Enter Contact List
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Index;
