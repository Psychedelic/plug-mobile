import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

const TokenFormat = ({ value, token, style }) => (
  <NumberFormat
    value={value}
    displayType="text"
    thousandSeparator=","
    decimalScale={8}
    suffix={` ${token}`}
    renderText={textValue => <Text style={style}>{textValue}</Text>}
  />
);

export default TokenFormat;
