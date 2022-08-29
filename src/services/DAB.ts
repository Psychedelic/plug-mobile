import { HttpAgent } from '@dfinity/agent';
import { DABCollection, getAllNFTS } from '@psychedelic/dab-js';
import { fetch } from 'react-native-fetch-api';

import { IC_URL_HOST } from '@/constants/general';

export const getAllDabNFTS = async (): Promise<DABCollection[]> => {
  const agent = new HttpAgent({ fetch, host: IC_URL_HOST });

  return getAllNFTS({ agent });
};
