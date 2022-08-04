import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import NumberFormat from 'react-number-format';

import Text from '@/components/common/Text';

interface Props {
  value?: string | number | null;
  style?: StyleProp<TextStyle>;
  decimalScale?: number;
  showSuffix?: boolean;
}

function UsdFormat({ value, style, decimalScale = 2, showSuffix }: Props) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale
      decimalScale={decimalScale}
      prefix="$"
      suffix={showSuffix ? ' USD' : undefined}
      renderText={textValue => <Text style={style}>{textValue}</Text>}
    />
  );
}

export default UsdFormat;
