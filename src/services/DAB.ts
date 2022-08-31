import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import {
  getAllNFTS,
  getTokenActor,
  getTokens,
  Token,
} from '@psychedelic/dab-js';
import { fetch } from 'react-native-fetch-api';

import { DFINITY_HOST, IC_URL_HOST } from '@/constants/urls';
import { DABToken } from '@/interfaces/dab';
import { recursiveParseBigint, recursiveParsePrincipal } from '@/utils/objects';

export const getDabTokens = async (): Promise<DABToken[]> => {
  const agent = new HttpAgent({ fetch, host: IC_URL_HOST });
  const tokens = await getTokens({ agent });
  const parsedTokens = (tokens || []).map(token =>
    recursiveParseBigint(recursiveParsePrincipal(token))
  );
  return parsedTokens.map((token: Token) => ({
    ...token,
    canisterId: token?.principal_id,
  }));
};

export const getDabNfts = async () => {
  const agent = new HttpAgent({ fetch, host: IC_URL_HOST });
  return getAllNFTS({ agent });
};

export const getTokenBalance = async (
  token: DABToken,
  user: Principal | string
) => {
  const agent = new HttpAgent({
    fetch,
    host: DFINITY_HOST,
  });
  const tokenActor = await getTokenActor({
    canisterId: token.canisterId.toString(),
    agent,
    standard: token.standard,
  });
  const amount = await tokenActor.getBalance(
    user instanceof Principal ? user : Principal.fromText(user)
  );
  return amount;
};
