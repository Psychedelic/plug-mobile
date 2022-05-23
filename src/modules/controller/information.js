import { getAssets } from '@/redux/slices/user';
import { walletConnectExecuteAndResponse } from '@/redux/slices/walletconnect';

const InformationModule = dispatch => {
  const getAssetsHandler = {
    methodName: 'getAssets',
    handler: async request => {
      dispatch(walletConnectExecuteAndResponse({ ...request, approved: true }));
    },
    executor: async (opts, ...args) => {
      const result = await dispatch(getAssets(args));
      return { result };
    },
  };

  return [getAssetsHandler];
};

export default InformationModule;
