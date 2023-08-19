import {useQuery} from '@tanstack/react-query';
import {findContact} from '@/api';

interface UseFindContactQueryProps {
  id: number;
  initialData?: IContact;
}

export const useFindContactQuery = ({id, initialData}: UseFindContactQueryProps) => {
  return useQuery<unknown, unknown, IContact>({
    queryKey: ['contact', {id}],
    queryFn: async ({signal}) => {
      return findContact({
        id,
        signal,
      });
    },
    initialData,
  });
};
