import React, {useEffect} from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {findContact, getEpisodes} from '@/api';
import {Divider, Stack, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import PageInfo from '@/components/pageInfo';
import PersonalInfoSection from '@/components/PersonalInfoSection';
import EpisodesTable from '@/components/EpisodesTable';
import ContactHeader from '@/components/ContactHeader';

interface Repo {
  data: IContact | null;
  episodes?: IEpisode[];
}

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

  useEffect(() => {
    if (data) return;
    router.push('/contact');
  }, [data]);

  if (!data) return null;

  return (
    <>
      <PageInfo
        title={`${data.name} - SleekFlow`}
        description={`View information about ${data.name}`}
      />
      <Stack>
        <ContactHeader data={data} />
        <Divider />
        <Stack
          sx={{
            gap: 2,
            paddingX: {xs: 2, md: 16},
            paddingY: {xs: 2, md: 4},
          }}
        >
          <Typography variant="h6">Personal Info</Typography>
          <PersonalInfoSection data={data} />

          <Typography variant="h6">Episodes</Typography>
          <EpisodesTable episodes={episodes ?? []} />
        </Stack>
      </Stack>
    </>
  );
}

export default ContactItem;
