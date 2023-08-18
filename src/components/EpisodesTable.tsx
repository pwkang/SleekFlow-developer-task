import React from 'react';
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const EPISODES_PER_PAGE = 10;

interface EpisodesTableProps {
  episodes: IEpisode[];
}

function EpisodesTable({episodes}: EpisodesTableProps) {
  const [episodePage, setEpisodePage] = React.useState<number>(1);

  function handleSwitchPage(event: React.ChangeEvent<unknown>, value: number) {
    setEpisodePage(value);
  }

  return (
    <>
      <Table
        sx={{
          border: '1px solid #e0e0e0',
          backgroundColor: '#fff',
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#ededed',
            }}
          >
            <TableCell>name</TableCell>
            <TableCell>Air Date</TableCell>
            <TableCell>Episode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes
            ?.slice((episodePage - 1) * EPISODES_PER_PAGE, episodePage * EPISODES_PER_PAGE)
            ?.map((episode, index) => (
              <TableRow key={index}>
                <TableCell>{episode?.name}</TableCell>
                <TableCell>{episode?.air_date}</TableCell>
                <TableCell>{episode?.episode}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          alignItems: 'center',
          gap: 2,
          justifyContent: 'flex-end',
        }}
      >
        <Pagination
          count={Math.ceil((episodes?.length ?? 0) / EPISODES_PER_PAGE)}
          page={episodePage}
          onChange={handleSwitchPage}
          siblingCount={2}
        />
        <Typography variant="body1">
          Showing {episodePage * EPISODES_PER_PAGE - 9}-
          {Math.min(episodePage * EPISODES_PER_PAGE, episodes?.length ?? 0)} of{' '}
          {episodes?.length ?? 0} episodes
        </Typography>
      </Stack>
    </>
  );
}

export default EpisodesTable;
