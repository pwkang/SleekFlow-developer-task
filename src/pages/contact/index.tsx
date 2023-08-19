import React from 'react';
import {Box, CircularProgress, Stack, TextField, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {useDebounce} from 'react-use';
import PageInfo from '@/components/pageInfo';
import ContactsTable from '@/components/ContactsTable';
import ContactsTablePagination from '@/components/ContactsTablePagination';
import useSelectContacts from '@/hook/useSelectContacts';

function Contact() {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page) : 1;
  const querySearchText = router.query.search ? String(router.query.search) : undefined;
  const [data, isLoading] = useSelectContacts({
    page,
    search: querySearchText,
  });
  const [loadingContact, setLoadingContact] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>(querySearchText ?? '');

  function handleSwitchPage(event: React.ChangeEvent<unknown>, value: number) {
    // setLoadingTable(true);
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
    router.push({
      query: {
        ...router.query,
        page: 1,
      },
    });
    setSearchText(value);
  }

  function handleItemClick(id: string) {
    setLoadingContact(true);
    router.push(`/contact/${id}`);
  }

  return (
    <>
      <PageInfo
        title="Contact List - SleekFlow"
        description="View our list of contacts with their related information"
      />
      {loadingContact && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Stack
        sx={{
          gap: 2,
          paddingY: {xs: 2, md: 8},
          paddingX: {xs: 2, md: 8},
        }}
      >
        <Typography variant="h3">Contacts</Typography>
        <Stack
          sx={{
            justifyContent: {xs: 'center', sm: 'space-between'},
            flexDirection: {xs: 'column', md: 'row'},
            gap: {xs: 2, md: 0},
          }}
        >
          <Box
            sx={{
              justifyContent: {xs: 'center', sm: 'flex-start'},
              width: {xs: '100%', md: 400},
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
          <ContactsTablePagination page={page} data={data} handleSwitchPage={handleSwitchPage} />
        </Stack>
        <ContactsTable data={data} onItemClick={handleItemClick} loading={isLoading} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: {xs: 'center', md: 'flex-end'},
          }}
        >
          <ContactsTablePagination page={page} data={data} handleSwitchPage={handleSwitchPage} />
        </Box>
      </Stack>
    </>
  );
}

export default Contact;
