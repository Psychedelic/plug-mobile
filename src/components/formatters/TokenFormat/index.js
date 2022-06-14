import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

import { VISIBLE_DECIMALS } from '@/constants/business';

function TokenFormat({ value, token, style, decimalScale }) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale
      decimalScale={decimalScale || value > 0 ? VISIBLE_DECIMALS : 2}
      suffix={` ${token}`}
      renderText={textValue => <Text style={style}>{textValue}</Text>}
    />
  );
}

export default TokenFormat;
