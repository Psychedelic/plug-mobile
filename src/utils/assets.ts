import { TOKENS } from '@/constants/assets';
import { ICP_CANISTER_ID } from '@/constants/canister';
import { Collection, CollectionToken } from '@/interfaces/redux';
import { validateCanisterId } from '@/utils/ids';

// TokenIdentifier is SYMBOL or  CanisterID
// Return ICP by default
export const getToken = (
  tokenIdentifier: string,
  assets: { canisterId: string; symbol: string }[]
) => {
  if (!tokenIdentifier) {
    return assets.find(asset => asset.canisterId === ICP_CANISTER_ID);
  }

  if (validateCanisterId(tokenIdentifier)) {
    return assets.find(asset => asset.canisterId === tokenIdentifier);
  }

  return assets.find(asset => asset.symbol === tokenIdentifier);
};

export const isDefaultToken = (canisterId: string) =>
  !!Object.values(TOKENS).find(token => token.canisterId === canisterId);

export const formatCollections = (collections: Collection[]) =>
  collections.flatMap(collection =>
    collection?.tokens.map((token: CollectionToken) => ({
      collectionDescription: collection.description,
      collectionName: collection.name,
      ...token,
    }))
  );
