import qs from 'qs';
import URL from 'url-parse';

import Routes from '@/navigation/Routes';
import {
  walletConnectOnSessionRequest,
  walletConnectSetPendingRedirect,
} from '@/redux/slices/walletconnect';
import { store } from '@/redux/store';
import Navigation from '@/utils/navigation';

function handleWalletConnect(uri, isUnlocked) {
  const { dispatch } = store;
  const { query } = new URL(uri);
  const { bridge, requestId } = qs.parse(query.substring(1));
  dispatch(
    walletConnectSetPendingRedirect({ requestId, redirect: { pending: true } })
  );
  if (isUnlocked) {
    Navigation.handleAction(Routes.WALLET_CONNECT_FLOWS, {
      loading: true,
    });
  }
  if (uri && bridge) {
    dispatch(
      walletConnectOnSessionRequest({
        uri,
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
  if (urlObj.protocol === 'https:') {
    const action = urlObj.pathname.split('/')[1];
    switch (action) {
      // We could add more actions here
      case 'wc': {
        const { uri } = qs.parse(urlObj.query.substring(1));
        handleWalletConnect(uri, isUnlocked);
        break;
      }
    }
  } else if (urlObj.protocol === 'wc:') {
    handleWalletConnect(url, isUnlocked);
  }
};
