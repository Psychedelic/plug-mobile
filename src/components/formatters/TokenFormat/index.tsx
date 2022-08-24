import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import NumberFormat from 'react-number-format';

import Text from '@/components/common/Text';
import { VISIBLE_DECIMALS } from '@/constants/business';

interface Props {
  value?: string | number | null;
  token: string;
  style?: StyleProp<TextStyle>;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
}

function TokenFormat({
  value,
  token,
  style,
  decimalScale,
  fixedDecimalScale = true,
}: Props) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale={fixedDecimalScale}
      decimalScale={
        decimalScale ? decimalScale : value && value > 0 ? VISIBLE_DECIMALS : 2
      }
      suffix={` ${token}`}
      renderText={textValue => <Text style={style}>{textValue}</Text>}
    />
  );
}

export default TokenFormat;
