// Routes.WALLET_CONNECT_INITAL_CONNECTION
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
