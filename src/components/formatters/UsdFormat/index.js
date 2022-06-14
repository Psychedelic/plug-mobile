import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

function UsdFormat({ value, style, decimalScale = 2 }) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale
      decimalScale={decimalScale}
      prefix="$"
      renderText={textValue => <Text style={style}>{textValue}</Text>}
    />
  );
}

export default UsdFormat;
