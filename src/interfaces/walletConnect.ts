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

interface WalletConnector {}

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
  args: [];
}

interface FlowsMetadata {
  url: string;
  name: string;
  pageWidth: number;
  icons: [];
}

interface FlowsArgs {
  domainUrl: string;
  whitelist: any;
}
