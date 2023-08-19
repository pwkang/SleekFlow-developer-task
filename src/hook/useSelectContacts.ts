import React, {useEffect} from 'react';
import {fetchContacts} from '@/api';

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
  const [data, setData] = React.useState<IGetContactResponse>(initialValue);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchContacts({page: page ?? 1, search}).then((response) => {
      setData(response);
      setLoading(false);
    });
  }, [page, search]);

  return [data, loading];
}

export default useSelectContacts;
