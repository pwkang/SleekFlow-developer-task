import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

interface IFetchContacts {
  page: number;
  search?: string;
}

export const fetchContacts = async ({
  search,
  page,
}: IFetchContacts): Promise<IGetContactResponse> => {
  try {
    const {data} = await axiosClient.get('/character', {
      params: {
        page,
        name: search,
      },
    });
    return data;
  } catch (error) {
    return {
      info: {
        count: 0,
        next: '',
        pages: 0,
        prev: '',
      },
      results: [],
    };
  }
};

interface IFindContact {
  id: number;
}

export const findContact = async ({id}: IFindContact): Promise<IContact | undefined> => {
  const page = Math.floor(id / 20) + 1;
  const {results} = await fetchContacts({page});
  return results.find((contact) => contact.id === id);
};

interface IGetEpisodes {
  ids: string[];
}

export const getEpisodes = async ({ids}: IGetEpisodes): Promise<IEpisode[]> => {
  try {
    const {data} = await axiosClient.get(`/episode/${ids.join(',')}`);
    return data;
  } catch (error) {
    return [];
  }
};
