import qs from 'qs';
import URL from 'url-parse';

import Routes from '@/navigation/Routes';
import {
  walletConnectOnSessionRequest,
  walletConnectRemovePendingRedirect,
  walletConnectSetPendingRedirect,
} from '@/redux/slices/walletconnect';
import { store } from '@/redux/store';
import Navigation from '@/utils/navigation';

function handleWalletConnect(uri) {
  const { dispatch } = store;
  dispatch(walletConnectSetPendingRedirect());
  Navigation.handleAction(Routes.WALLET_CONNECT_WAITING_BRIDGE);
  const { query } = new URL(uri);
  if (uri && query) {
    dispatch(
      walletConnectOnSessionRequest({
        uri,
      }),
    );
  }
}

export const handleDeepLink = url => {
  if (!url) {
    return;
  }
  // Check if we need to wait till the wallet is ready to handle any deeplink
  const urlObj = new URL(url);
  if (urlObj.protocol === 'https:') {
    const action = urlObj.pathname.split('/')[1];
    switch (action) {
      // We could add more actions here
      case 'wc': {
        const { uri } = qs.parse(urlObj.query.substring(1));
        handleWalletConnect(uri);
        break;
      }
    }
  } else if (urlObj.protocol === 'wc:') {
    handleWalletConnect(url);
  }
};
