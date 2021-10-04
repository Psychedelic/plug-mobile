import { useSelector } from 'react-redux';
//import getRandom from '../helpers/random';

const useKeyring = () => {
  const { instance } = useSelector(state => state.keyring);

  const createWallet = async password => {
    //const entropy = await getRandom(16);
    //instance.create({ password, entropy });
  };

  const importWallet = params => {
    //instance.import(params);
  };

  return { keyring: instance, createWallet, importWallet };
};

export default useKeyring;
