import React from 'react';
import {
  Box,
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
import {useDebounce} from 'react-use';
import PageInfo from '@/components/pageInfo';

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

interface PaginationItemProps {
  page: number;
  data: IGetContactResponse;
  handleSwitchPage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function PaginationItem({page, handleSwitchPage, data}: PaginationItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Pagination
        page={page}
        count={data.info.pages}
        siblingCount={2}
        onChange={handleSwitchPage}
      />
      <Typography variant="body1">
        Showing {page * 20 - 19}-{Math.min(page * 20, data.info.count)} of {data.info.count}{' '}
        contacts
      </Typography>
    </Box>
  );
}

function Contact({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page) : 1;
  const querySearchText = router.query.search ? String(router.query.search) : undefined;
  const [searchText, setSearchText] = React.useState<string>(querySearchText ?? '');

  function handleSwitchPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push({
      query: {
        ...router.query,
        page: value,
      },
    });
  }

  useDebounce(
    () => {
      const page = router.query.page ? Number(router.query.page) : 1;
      router.push({
        query: {
          ...(searchText ? {search: searchText} : {}),
          ...(page === 1 ? {} : {page}),
        },
      });
    },
    250,
    [searchText]
  );

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchText(value);
  }

  function handleClick(event: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) {
    const target = event.target as HTMLElement;
    const parent = target.parentElement;
    if (!parent) return;
    router.push(`/contact/${parent.id}`);
  }

  return (
    <>
      <PageInfo
        title="Contact List - SleekFlow"
        description="View our list of contacts with their related information"
      />
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
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              size="small"
              sx={{
                backgroundColor: '#fff',
              }}
            />
          </Box>
          <PaginationItem page={page} data={data} handleSwitchPage={handleSwitchPage} />
        </Box>
        <TableContainer>
          <Table
            sx={{
              border: '1px solid #e0e0e0',
              backgroundColor: '#fff',
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#e5e5e5',
                }}
              >
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody onClick={handleClick}>
              {data.results.map((row, index) => (
                <TableRow
                  id={String(row.id)}
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: '#f8f8f8',
                    },
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.species}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <PaginationItem page={page} data={data} handleSwitchPage={handleSwitchPage} />
        </Box>
      </Stack>
    </>
  );
}

export default Contact;
