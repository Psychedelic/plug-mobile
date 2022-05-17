import { getAssets } from '@/redux/slices/user';

const InformationModule = dispatch => {
  const getAssetsHandler = {
    methodName: 'getAssets',
    handler: async (opts, ...args) => {
      console.log('GET_ASSETS');
      const result = await dispatch(getAssets(args));
      return { result };
    },
  };

  return [getAssetsHandler];
};

export default InformationModule;
