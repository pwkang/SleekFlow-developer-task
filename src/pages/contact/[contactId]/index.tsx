import React, {useEffect} from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {findContact, getEpisodes} from '@/api';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Icon,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';

interface Repo {
  data: IContact | null;
  episodes?: IEpisode[];
}

const EPISODES_PER_PAGE = 10;

export const getServerSideProps: GetServerSideProps<Repo> = async ({params}) => {
  const data = await findContact({
    id: Number(params?.contactId),
  });
  const episodes = await getEpisodes({
    ids: (data?.episode.map((url) => url.match(/\/(\d+)$/)?.[1]).filter(Boolean) as string[]) ?? [],
  });
  return {
    props: {
      data: data ?? null,
      episodes: episodes ?? [],
    },
  };
};

function ContactItem({data, episodes}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [episodePage, setEpisodePage] = React.useState<number>(1);

  useEffect(() => {
    if (data) return;
    router.push('/contact');
  }, [data]);

  if (!data) return null;

  function getEpisode(url: string) {
    const id = url.match(/\/(\d+)$/)?.[1];
    if (episodes) return episodes?.find((episode) => episode.id === Number(id));
  }

  function handleSwitchPage(event: React.ChangeEvent<unknown>, value: number) {
    setEpisodePage(value);
  }

  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          paddingX: 16,
          paddingY: 4,
          backgroundColor: '#b2b2b2',
        }}
      >
        <IconButton onClick={() => router.back()}>
          <Icon>arrow_back</Icon>
        </IconButton>
        <Avatar
          src={data.image}
          sx={{
            width: 80,
            height: 80,
          }}
        />
        <Typography variant="h3">{data.name}</Typography>
      </Box>
      <Divider />
      <Stack
        sx={{
          gap: 2,
          paddingX: 16,
          paddingY: 4,
        }}
      >
        <Typography variant="h6">Personal Info</Typography>
        <Grid
          container
          sx={{
            backgroundColor: '#f5f5f5',
            width: '100%',
            paddingX: 4,
            paddingY: 2,
            rowGap: 2,
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography>Status: {data.status}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Gender: {data.gender}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Location: {data.location.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Origin: {data.origin.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Species: {data.species}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h6">Episodes</Typography>
        <Table
          sx={{
            border: '1px solid #e0e0e0',
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
            {data.episode
              ?.slice((episodePage - 1) * EPISODES_PER_PAGE, episodePage * EPISODES_PER_PAGE)
              ?.map(getEpisode)
              ?.map((episode, index) => (
                <TableRow key={index}>
                  <TableCell>{episode?.name}</TableCell>
                  <TableCell>{episode?.air_date}</TableCell>
                  <TableCell>{episode?.episode}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: 'flex',
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
          <Typography variant="body1">{episodes?.length ?? 0} episodes </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default ContactItem;
