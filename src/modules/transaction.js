const TransactionModule = () => {
  const sign = {
    methodName: 'sign',
    handler: async (opts, msg) => {
      console.log('SIGN', msg);
      return;
    },
  };

  return [sign];
};

export default TransactionModule;
