import qs from 'qs';
import URL from 'url-parse';

import { store } from '../redux/store';
import {
  walletConnectSetPendingRedirect,
  walletConnectOnSessionRequest,
  walletConnectRemovePendingRedirect,
} from '../redux/slices/walletconnect';

function handleWalletConnect(uri) {
  const { dispatch } = store;
  dispatch(walletConnectSetPendingRedirect());
  const { query } = new URL(uri);
  console.log('HANDLE WALLET CONNECT', uri, query);
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
  if (!url) return;
  // We need to wait till the wallet is ready
  // to handle any deeplink

  const urlObj = new URL(url);
  console.log(
    'HANDLE_DEEP_LINK',
    url,
    urlObj.protocol,
    urlObj.pathname.split('/')[1],
  );
  if (urlObj.protocol === 'https:') {
    const action = urlObj.pathname.split('/')[1];
    switch (action) {
      case 'wc': {
        const { uri } = qs.parse(urlObj.query.substring(1));
        handleWalletConnect(uri);
        break;
      }
    }
  }
};
