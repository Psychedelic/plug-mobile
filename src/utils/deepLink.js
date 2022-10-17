import qs from 'qs';
import URL from 'url-parse';

import Routes from '@/navigation/Routes';
import {
  walletConnectOnSessionRequest,
  walletConnectSetPendingRedirect,
} from '@/redux/slices/walletconnect';
import { store } from '@/redux/store';
import { navigate } from '@/utils/navigation';

const parseUniversalLink = url => {
  const urlObj = new URL(url);
  const { uri, requestId } = qs.parse(urlObj.query.substring(1));

  const uriObj = new URL(uri);
  const { bridge } = qs.parse(uriObj.query.substring(1));

  return { bridge, uri, requestId };
};

const parseDeepLink = uri => {
  const { query } = new URL(uri);
  const { bridge, requestId } = qs.parse(query.substring(1));

  return { bridge, uri, requestId };
};

function handleWalletConnect(uri, bridge, requestId, isUnlocked) {
  const { dispatch } = store;
  dispatch(
    walletConnectSetPendingRedirect({ requestId, redirect: { pending: true } })
  );
  if (isUnlocked) {
    navigate(Routes.WALLET_CONNECT_FLOWS, {
      requestId,
      loading: true,
    });
  }
  if (uri && bridge) {
    dispatch(
      walletConnectOnSessionRequest({
        uri,
        requestId,
      })
    );
  }
}

export const handleDeepLink = (url, isUnlocked) => {
  if (!url) {
    return;
  }
  // Check if we need to wait till the wallet is ready to handle any deeplink
  const urlObj = new URL(url);
  if (urlObj.protocol === 'plug:' || urlObj.protocol === 'https:') {
    const action = urlObj.pathname.split('/')[1];
    switch (action) {
      // We could add more actions here
      case 'wc': {
        const { bridge, uri, requestId } = parseUniversalLink(url);

        handleWalletConnect(uri, bridge, requestId, isUnlocked);
        break;
      }
    }
  } else if (urlObj.protocol === 'wc:') {
    const { bridge, uri, requestId } = parseDeepLink(url);

    handleWalletConnect(uri, bridge, requestId, isUnlocked);
  }
};
