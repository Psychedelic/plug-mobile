import { useSelector } from 'react-redux';
//import getRandom from '../helpers/random';

const useKeyring = () => {
  const { instance } = useSelector(state => state.keyring);

  const createWallet = async ({ password, biometricsKey }) => {
    //const entropy = await getRandom(16);
    //const key = biometricsKey ? biometricsKey : entropy;
    //instance.create({ password, key });
  };

  const importWallet = params => {
    //instance.import(params);
  };

  return { keyring: instance, createWallet, importWallet };
};

export default useKeyring;
