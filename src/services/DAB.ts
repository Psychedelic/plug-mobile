import { HttpAgent } from '@dfinity/agent';
import { DABCollection, getAllNFTS } from '@psychedelic/dab-js';
import { fetch } from 'react-native-fetch-api';

export const getAllDabNFTS = async (): Promise<DABCollection[]> => {
  const agent = new HttpAgent({ fetch });

  return getAllNFTS({ agent });
};
