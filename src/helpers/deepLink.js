import qs from 'qs';
import URL from 'url-parse';

import { store } from '../redux/store';
import {
  walletConnectSetPendingRedirect,
  walletConnectOnSessionRequest,
  walletConnectRemovePendingRedirect,
} from '../redux/slices/walletconnect';

export const handleDeepLink = url => {
  const urlObj = new URL(url);
  const { uri } = qs.parse(urlObj.query.substring(1));
  const { dispatch } = store;
  dispatch(walletConnectSetPendingRedirect());
  if (uri && urlObj.query) {
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
};
