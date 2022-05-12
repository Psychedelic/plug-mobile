import qs from 'qs';
import URL from 'url-parse';

import {
  walletConnectOnSessionRequest,
  walletConnectRemovePendingRedirect,
  walletConnectSetPendingRedirect,
} from '@/redux/slices/walletconnect';
import { store } from '@/redux/store';

function handleWalletConnect(uri) {
  const { dispatch } = store;
  dispatch(walletConnectSetPendingRedirect());
  const { query } = new URL(uri);
  if (uri && query) {
    dispatch(
      walletConnectOnSessionRequest({
        uri,
        callback: (status, dappScheme) => {
          const type = status === 'approved' ? 'connect' : status;
          dispatch(
            walletConnectRemovePendingRedirect({ type, scheme: dappScheme }),
          );
        },
      }),
    );
  } else {
    // This is when we get focused by WC due to a signing request
  }
}

export const handleDeepLink = url => {
  if (!url) {
    return;
  }
  // We need to wait till the wallet is ready
  // to handle any deeplink

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
  }
};
