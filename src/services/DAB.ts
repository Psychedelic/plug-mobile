import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import {
  getAllNFTS,
  getNFTActor,
  getTokenActor,
  getTokens,
  NFTDetails,
  Token,
} from '@psychedelic/dab-js';
import { fetch } from 'react-native-fetch-api';

import { IC_URL_HOST } from '@/constants/general';
import { DFINITY_MAINNET_URL } from '@/constants/urls';
import { DABToken } from '@/interfaces/dab';
import { CollectionToken } from '@/interfaces/redux';
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

export const getNFTDetails = async ({
  index,
  canister,
  standard,
}: CollectionToken): Promise<NFTDetails<string | bigint>> => {
  const agent = new HttpAgent({ fetch, host: IC_URL_HOST });
  const NFTActor = getNFTActor({ canisterId: canister, standard, agent });
  const details = await NFTActor.details(index);
  return details;
};

export const getTokenBalance = async (
  token: DABToken,
  user: Principal | string
) => {
  const agent = new HttpAgent({
    fetch,
    host: DFINITY_MAINNET_URL,
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
