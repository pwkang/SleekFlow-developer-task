import {useRouter} from 'next/router';
import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

interface ContactsTableProps {
  data: IGetContactResponse;
}

function ContactsTable({data}: ContactsTableProps) {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) {
    const target = event.target as HTMLElement;
    const parent = target.parentElement;
    if (!parent) return;
    router.push(`/contact/${parent.id}`);
  }

  return (
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
  );
}

export default ContactsTable;
