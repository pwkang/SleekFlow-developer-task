import React from 'react';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface ContactsTableProps {
  data: IGetContactResponse;
  onItemClick: (id: string) => void;
  loading?: boolean;
}

function ContactsTable({data, onItemClick, loading}: ContactsTableProps) {
  function handleClick(event: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) {
    if (loading) return;
    const target = event.target as HTMLElement;
    const parent = target.parentElement;
    if (!parent) return;
    onItemClick(parent.id);
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
          {loading &&
            new Array(20).fill(0).map((_, index) => (
              <TableRow
                key={index}
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f8f8f8',
                  },
                }}
              >
                <TableCell width="60%">
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell width="10%">
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell width="20%">
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell width="10%">
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
            ))}
          {!loading &&
            data.results.map((row, index) => (
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
                <TableCell width="60%">{row.name}</TableCell>
                <TableCell width="10%">{row.status}</TableCell>
                <TableCell width="20%">{row.species}</TableCell>
                <TableCell width="10%">{row.gender}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactsTable;
