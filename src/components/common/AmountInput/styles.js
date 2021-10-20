import { StyleSheet } from "react-native";
import { Colors, FontStyles } from "../../../constants/theme";

export default StyleSheet.create({
  textInput: {
    ...FontStyles.Normal,
    fontSize: 24,
    marginRight: 'auto',
  },
  container: {
    backgroundColor: Colors.Black.Primary,
    flexDirection: 'row',
    height: 63,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  symbol: {
    ...FontStyles.NormalGray,
    fontWeight: '500',
    marginLeft: 12,
  },
});