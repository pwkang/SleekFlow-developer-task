import {useQuery} from '@tanstack/react-query';
import {axiosClient} from '@/api';
import {Simulate} from 'react-dom/test-utils';

interface UseGetContactsProps {
  page?: number;
  search?: string;
}

export const useGetContacts = ({search, page}: UseGetContactsProps) => {
  return useQuery<unknown, unknown, IGetContactResponse>(
    [
      'contacts',
      {
        page: page ?? 1,
        search: search ?? '',
      },
    ],
    async ({signal}) => {
      const {data} = await axiosClient.get('/character', {
        params: {
          page,
          name: search,
        },
        signal,
      });

      return data;
    }
  );
};
