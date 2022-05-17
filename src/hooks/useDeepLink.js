import { createContext, useContext, useState } from 'react';

const DeepLinkContext = createContext(null);

const useDeepLink = () => {
  return { deepLink: useContext(DeepLinkContext), DeepLinkContext };
};

export default useDeepLink;
