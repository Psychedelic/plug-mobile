import Routes from '@/navigation/Routes';
import Navigation from '@/utils/navigation';

const TransactionModule = dispatch => {
  const sign = {
    methodName: 'sign',
    executor: (opts, msg) => {
      console.log('SIGN', msg);
    },
    handler: async request => {
      Navigation.handleAction(Routes.WALLET_CONNECT_CALL_REQUEST, {
        openAutomatically: true,
        transactionDetails: request,
      });
    },
  };

  return [sign];
};

export default TransactionModule;
