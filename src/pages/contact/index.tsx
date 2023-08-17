import React from 'react';
import {
  Box,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {fetchContacts} from '@/api';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {useRouter} from 'next/router';

interface Repo {
  data: IGetContactResponse;
}

export const getServerSideProps: GetServerSideProps<Repo> = async ({query}) => {
  const data = await fetchContacts({
    page: query.page ? Number(query.page) : 1,
    search: query.search ? String(query.search) : undefined,
  });
  return {
    props: {
      data,
    },
  };
};

function Contact({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page) : 1;

  function handleSwitchPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push({
      query: {
        ...router.query,
        page: value,
      },
    });
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    router.push({
      query: {
        search: value,
        page: 1,
      },
    });
  }

  return (
    <Stack
      sx={{
        gap: 2,
        paddingY: 8,
        paddingX: 16,
      }}
    >
      <Typography variant="h3">Contacts</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: 400,
          }}
        >
          <TextField fullWidth label="Search" variant="outlined" onChange={handleSearch} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Pagination page={page} count={data.info.pages} onChange={handleSwitchPage} />
          <Typography variant="body1">{data.info.count} results found</Typography>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>origin</TableCell>
              <TableCell>location</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.origin.name}</TableCell>
                <TableCell>{row.location.name}</TableCell>
                <TableCell>{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Contact;
