import axios, {GenericAbortSignal} from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

interface IFetchContacts {
  page: number;
  search?: string;
  signal?: GenericAbortSignal;
}

export const fetchContacts = async ({
  search,
  page,
  signal,
}: IFetchContacts): Promise<IGetContactResponse> => {
  try {
    const {data} = await axiosClient.get('/character', {
      params: {
        page,
        name: search,
      },
      signal,
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
  signal?: GenericAbortSignal;
}

export const findContact = async ({id, signal}: IFindContact): Promise<IContact | undefined> => {
  try {
    const {data} = await axiosClient.get(`/character/${id}`, {
      signal,
    });
    return data;
  } catch (error) {
    return undefined;
  }
};

interface IGetEpisodes {
  ids: string[];
  signal?: GenericAbortSignal;
}

export const getEpisodes = async ({ids, signal}: IGetEpisodes): Promise<IEpisode[]> => {
  try {
    const {data} = await axiosClient.get(`/episode/[${ids.join(',')}]`, {
      signal,
    });
    return data;
  } catch (error) {
    return [];
  }
};
