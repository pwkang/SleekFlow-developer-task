import React, {useEffect} from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {findContact, getEpisodes} from '@/api';
import {
  Avatar,
  Box,
  Divider,
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
  data?: IContact;
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
      data,
      episodes,
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
        <Typography>Episodes</Typography>
        <Table>
          <TableHead>
            <TableRow>
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
      </Box>
    </Stack>
  );
}

export default ContactItem;
