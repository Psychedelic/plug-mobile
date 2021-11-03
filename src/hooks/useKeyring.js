import { useSelector } from 'react-redux';
//import * as Keychain from 'react-native-keychain';
//import getRandom from '../helpers/random';

//Set biometrics prompt message
//const defaultOptions = {
//  service: '',
//};

const useKeyring = () => {
  const { instance } = useSelector(state => state.keyring);

  const createWallet = async ({ password, biometryType }) => {
    //if (biometricsAvaliable) {
    //  const authOptions = {
    //		accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    //  };
    //
    //  if (type === this.TYPES.BIOMETRICS) {
		//	  authOptions.accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET;
		//  } else if (type === this.TYPES.PASSCODE) {
	  //		authOptions.accessControl = Keychain.ACCESS_CONTROL.DEVICE_PASSCODE;
		//  }
    //
    //  await Keychain.setGenericPassword('plug-user', password, { ...defaultOptions, ...authOptions});
    //}
    //
    //const entropy = await getRandom(16);
    //instance.create({ password, entropy });
  };

  const importWallet = params => {
    //instance.import(params);
  };

  return { keyring: instance, createWallet, importWallet };
};

export default useKeyring;
