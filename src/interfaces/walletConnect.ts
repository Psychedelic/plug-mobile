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

interface WallectConnectSessionRouteParams {
  callback: () => void;
  receivedTimestamp: number;
}

export interface WalletConnectSession {
  walletConnector: WalletConnector;
  meta: WalletConnectMetadata;
  navigate: boolean;
  timedOut: false;
  timeout: null;
  routeParams: WallectConnectSessionRouteParams;
}

export interface WallectConnectFlowsData {
  request: FlowsRequest;
  metadata: FlowsMetadata;
  args: FlowsArgs;
}

interface FlowsRequest {
  clientId: string;
  dappName: string;
  dappScheme: any;
  dappUrl: string;
  imageUrl: string;
  methodName: string;
  peerId: string;
  requestId: number;
  args: [FlowsMetadata, WCWhiteList, number, string];
}

interface FlowsMetadata {
  url: string;
  name: string;
  pageWidth: number;
  icons: string[];
}

interface FlowsArgs {
  domainUrl: string;
  whitelist: WCWhiteList;
}

enum WCHandleActionStatus {
  accepted = 'accepted',
  refused = 'refused',
}

interface WCWhiteList {
  // TODO: add whitelist types
}

export enum WCFlowTypes {
  transfer = 'transfer',
  requestConnect = 'requestConnect',
  requestCall = 'requestCall',
  batchTransactions = 'batchTransactions',
}

export interface FlowsParams {
  handleError: () => void;
  loading: boolean;
  //
  type: WCFlowTypes;
  openAutomatically: boolean;
  request: FlowsRequest;
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
