import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Text, { TextProps } from '../Text';

interface Coordinate {
  x: number;
  y: number;
}

interface Props extends TextProps {
  colors: string[];
  start?: Coordinate;
  end?: Coordinate;
}

function GradientText({ colors, style, start, end, ...props }: Props) {
  return (
    <MaskedView maskElement={<Text style={style} {...props} />}>
      <LinearGradient
        colors={colors}
        start={start || { x: 0, y: 0 }}
        end={end || { x: 1, y: 1 }}>
        <Text {...props} style={[style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
}

export default GradientText;
