import React, {useEffect} from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {findContact} from '@/api';
import {Avatar, Box, Divider, Stack, Typography} from '@mui/material';
import {useRouter} from 'next/router';

interface Repo {
  data?: IContact;
}

export const getServerSideProps: GetServerSideProps<Repo> = async ({params}) => {
  const data = await findContact({
    id: Number(params?.contactId),
  });
  return {
    props: {
      data,
    },
  };
};

function ContactItem({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);
  const router = useRouter();

  useEffect(() => {
    if (data) return;
    router.push('/contact');
  }, [data]);

  if (!data) return null;

  return (
    <Stack>
      <Box>
        <Avatar src={data.image} />
        <Typography>{data.name}</Typography>
      </Box>
      <Divider />
      <Box>
        <Typography>Personal Info</Typography>
        <Box>
          <Typography>Status: {data.status}</Typography>
          <Typography>Gender: {data.gender}</Typography>
          <Typography>Location: {data.location.name}</Typography>
          <Typography>Origin: {data.origin.name}</Typography>
          <Typography>Species: {data.species}</Typography>
        </Box>
      </Box>
    </Stack>
  );
}

export default ContactItem;
