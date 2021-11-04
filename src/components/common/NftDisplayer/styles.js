import { Dimensions, StyleSheet } from "react-native";

const imageSize = Dimensions.get('window').width - 40;

export default StyleSheet.create({
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 20,
    alignSelf: 'center'
  },
});
