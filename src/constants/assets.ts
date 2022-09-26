import { ICP_CANISTER_ID, WICP_CANISTER_ID, XTC_CANISTER_ID } from './canister';

export const E8S_PER_ICP = 100000000;
export const CYCLES_PER_TC = 1000000000000;
export const USD_PER_TC = 1.42656;

export const TOKEN_IMAGES = {
  XTC: 'xtc',
  ICP: 'dfinity',
  WICP: 'wicp',
};

export const DEFAULT_ASSETS = [
  ICP_CANISTER_ID,
  XTC_CANISTER_ID,
  WICP_CANISTER_ID,
];

export const TOKENS = {
  ICP: {
    symbol: 'ICP',
    canisterId: ICP_CANISTER_ID,
    name: 'ICP',
    decimals: 8,
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.ICP,
  },
  XTC: {
    symbol: 'XTC',
    canisterId: XTC_CANISTER_ID,
    name: 'Cycles',
    decimals: 12,
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.XTC,
  },
  WICP: {
    symbol: 'WICP',
    canisterId: WICP_CANISTER_ID,
    name: 'Wrapped ICP',
    decimals: 8,
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.WICP,
  },
};
