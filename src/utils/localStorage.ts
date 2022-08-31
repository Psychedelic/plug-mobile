import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStorage = async () => {
  const appKeys = await AsyncStorage.getAllKeys();
  return await AsyncStorage.multiRemove(appKeys as string[]);
};
