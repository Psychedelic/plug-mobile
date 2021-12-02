import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

const TokenFormat = ({ value, token, style }) => (
  <NumberFormat
    value={Number(value).toFixed(8)}
    displayType="text"
    thousandSeparator=","
    decimalScale={5}
    fixedDecimalScale
    suffix={` ${token}`}
    renderText={textValue => <Text style={style}>{textValue}</Text>}
  />
);

export default TokenFormat;
