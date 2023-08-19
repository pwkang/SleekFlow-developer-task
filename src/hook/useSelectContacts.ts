import React, {useEffect} from 'react';
import {useGetContacts} from '@/tanstack/queries/useGetContacts';

interface UseSelectContactsProps {
  page?: number;
  search?: string;
}

const initialValue: IGetContactResponse = {
  info: {
    count: 0,
    next: '',
    pages: 0,
    prev: '',
  },
  results: [],
};

function useSelectContacts({page, search}: UseSelectContactsProps): [IGetContactResponse, boolean] {
  const getContactsQuery = useGetContacts({
    search,
    page,
  });
  const [data, setData] = React.useState<IGetContactResponse>(initialValue);

  useEffect(() => {
    if (!getContactsQuery.data) return;
    setData(getContactsQuery.data);
  }, [getContactsQuery.data]);

  return [data, getContactsQuery.isLoading];
}

export default useSelectContacts;
