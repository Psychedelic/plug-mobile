import { createContext, useContext } from 'react';

const DeepLinkContext = createContext(null);

const useDeepLink = () => {
  return { deepLink: useContext(DeepLinkContext), DeepLinkContext };
};

export default useDeepLink;
