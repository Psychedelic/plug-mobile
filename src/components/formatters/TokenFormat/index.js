import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

function TokenFormat({ value, token, style }) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      decimalScale={8}
      suffix={` ${token}`}
      renderText={textValue => <Text style={style}>{textValue}</Text>}
    />
  );
}

export default TokenFormat;
