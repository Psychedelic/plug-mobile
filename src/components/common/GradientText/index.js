import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import LinearGradient from "react-native-linear-gradient";

const GradientText = ({ colors, style, ...props }) => {
  return (
    <MaskedView maskElement={<Text style={style}{...props} />}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text {...props} style={[style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
