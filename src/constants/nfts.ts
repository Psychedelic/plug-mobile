import { isAndroid } from './platform';

// Since we're having problems with Apple's approval we're disabling NFTs until we find a solution

export const ENABLE_NFTS = isAndroid;
