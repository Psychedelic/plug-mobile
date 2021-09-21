import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

const UsdFormat = ({ value, style }) => (
  <NumberFormat
    value={value}
    displayType="text"
    thousandSeparator=","
    decimalScale={2}
    prefix="$"
    renderText={textValue => <Text style={style}>{textValue}</Text>}
  />
);

export default UsdFormat;
