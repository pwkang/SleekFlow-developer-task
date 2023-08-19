import {useQuery} from '@tanstack/react-query';
import {getEpisodes} from '@/api';

interface UseGetEpisodesQueryProps {
  ids: string[];
  initialData?: IEpisode[];
}

export const useGetEpisodesQuery = ({ids, initialData}: UseGetEpisodesQueryProps) => {
  return useQuery<unknown, unknown, IEpisode[]>(
    ['episodes', {ids}],
    async ({signal}) => {
      return getEpisodes({ids, signal});
    },
    {
      initialData,
    }
  );
};
