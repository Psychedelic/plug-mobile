import { Nullable } from './general';

export interface WalletConnectMetadata {
  chainId: number;
  dappName: string;
  dappScheme?: string;
  dappUrl?: string;
  peerId: string;
}

export interface WallectConnectAgent {
  uri: string;
  meta: WalletConnectMetadata;
}

interface WalletConnector {
  // TODO: Add types
}

export interface ClientMeta {
  description: string;
  url: string;
  icons: string[];
  name: string;
}

interface WallectConnectSessionRouteParams {
  callback: () => void;
  receivedTimestamp: number;
}

export interface WallectConnectFlowsData {
  request: FlowsRequest;
  metadata: FlowsMetadata;
  args: FlowsArgs;
}

export interface FlowsRequest {
  clientId: string;
  dappName: string;
  dappScheme: any;
  dappUrl: string;
  imageUrl: string;
  methodName: string;
  peerId: string;
  requestId: number;
  args: [FlowsMetadata, WCTransactions[], number, string];
}
interface WCTransactions {
  methodName: string;
  canisterId: string;
  sender: string;
  arguments: string;
  preApprove: boolean;
  requestType: string;
  decodedArguments: any;
}
export interface FlowsMetadata {
  url: string;
  name: string;
  pageWidth: number;
  icons: string[];
}

export interface FlowsArgs {
  methodName: string;
  domainUrl: string;
  whitelist: WCWhiteList;
  shouldWarn?: boolean;
  canisterId: string;
  decodedArguments: any[];
  amount?: number;
  strAmount?: string;
}

enum WCHandleActionStatus {
  accepted = 'accepted',
  refused = 'refused',
}

export type WCWhiteList = {
  [key: string]: WCWhiteListItem;
};

export interface WCWhiteListItem {
  canisterId: string;
  id: string;
  url: string;
  name: string;
  description: string;
  version: Nullable<number>;
  logo_url: string;
  icon: string;
}

export enum WCFlowTypes {
  transfer = 'transfer',
  requestConnect = 'requestConnect',
  requestCall = 'requestCall',
  batchTransactions = 'batchTransactions',
}

export interface WCToken {
  amount: number;
  canisterId: string;
  decimals: number;
  icon: string; // this is the iconName actually, not an url
  symbol: string;
  name: string; // this is the name of the symbol
  value: number;
}

export interface FlowsParams {
  handleError: () => void;
  loading: boolean;
  token: WCToken;
  type: WCFlowTypes;
  canisterInfo: WCWhiteListItem;
  canisterId: string;
  openAutomatically: boolean;
  requestId: number;
  metadata: FlowsMetadata;
  args: FlowsArgs;
  handleApproveArgs: [
    string,
    { status: WCHandleActionStatus.accepted; whitelist: WCWhiteList }
  ];
  handleDeclineArgs: [
    string,
    { status: WCHandleActionStatus.refused; whitelist: WCWhiteList }
  ];
}

export interface TransactionData {
  canisterId: string;
  methodName: string;
  args: string;
}
