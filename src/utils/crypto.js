import bip39 from 'react-native-bip39';

export const generateMnemonic = async () => {
  try {
    return await bip39.generateMnemonic(128);
  } catch (e) {
    console.log('Error at generateMnemonic: ', e);
    return false;
  }
};
