import {useQuery} from '@tanstack/react-query';
import {fetchContacts} from '@/api';

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
      return fetchContacts({
        signal,
        search,
        page: page ?? 1,
      });
    }
  );
};
