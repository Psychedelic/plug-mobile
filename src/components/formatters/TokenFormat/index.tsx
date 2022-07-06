import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import NumberFormat from 'react-number-format';

import { VISIBLE_DECIMALS } from '@/constants/business';

interface Props {
  value?: string | number | null;
  token: string;
  style?: StyleProp<TextStyle>;
  decimalScale?: number;
}

function TokenFormat({ value, token, style, decimalScale }: Props) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale
      decimalScale={decimalScale || (value && value > 0) ? VISIBLE_DECIMALS : 2}
      suffix={` ${token}`}
      renderText={textValue => <Text style={style}>{textValue}</Text>}
    />
  );
}

export default TokenFormat;
