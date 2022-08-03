import { ICP_CANISTER_ID } from '@/constants/canister';
import { validateCanisterId } from '@/utils/ids';

// TokenIdentifier is SYMBOL or  CanisterID
// Return ICP by default
export const getToken = (tokenIdentifier, assets) => {
  if (!tokenIdentifier) {
    return assets.find(asset => asset.canisterId === ICP_CANISTER_ID);
  }

  if (validateCanisterId(tokenIdentifier)) {
    return assets.find(asset => asset.canisterId === tokenIdentifier);
  }

  return assets.find(asset => asset.symbol === tokenIdentifier);
};
