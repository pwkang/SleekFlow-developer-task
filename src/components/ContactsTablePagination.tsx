import React from 'react';
import {Pagination, Stack, Typography} from '@mui/material';

interface PaginationItemProps {
  page: number;
  data: IGetContactResponse;
  handleSwitchPage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function ContactsTablePagination({page, handleSwitchPage, data}: PaginationItemProps) {
  return (
    <Stack
      sx={{
        flexDirection: {xs: 'column', md: 'row'},
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
    </Stack>
  );
}

export default ContactsTablePagination;
