import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

const UsdFormat = ({ value, style }) => {
  return (
    <NumberFormat
      value={Number(value).toFixed(8)}
      displayType="text"
      thousandSeparator=","
      decimalScale={2}
      fixedDecimalScale
      prefix="$"
      renderText={textValue => <Text style={style}>{textValue}</Text>}
    />
  );
};
export default UsdFormat;
