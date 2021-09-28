import { StyleSheet } from "react-native";
import { FontStyles } from "../../../constants/theme";

export default StyleSheet.create({
  text: {
    ...FontStyles.LinkButton,
    fontWeight: '600',
    marginLeft: 9,
  },
  container:{
    flexDirection: 'row'
  }
})