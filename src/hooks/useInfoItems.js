import { Linking } from "react-native";

const useInfoItems = () => {
  return [
    {
      name: '📕  Learn more about Plug',
      onPress: () => Linking.openURL('https://docs.plugwallet.ooo'),
    },
    {
      name: '📰  Read our Blog',
      onPress: () => Linking.openURL('https://medium.com/plugwallet'),
    },
    {
      name: '🐦  Follow us on Twitter',
      onPress: () => Linking.openURL('https://twitter.com/plug_wallet'),
    },
    {
      name: '👾  Join our Discord',
      onPress: () => Linking.openURL('https://discord.plugwallet.ooo'), //change later to magic linking
    },
  ]
}

export default useInfoItems;
