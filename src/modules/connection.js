const ConnectionModule = () => {
  const getConnectionData = {
    methodName: 'getConnectionData',
    handler: async (opts, url) => {
      console.log('GET CONNECTION DATA', url);
      return;
    },
  };

  return [getConnectionData];
};

export default ConnectionModule;
