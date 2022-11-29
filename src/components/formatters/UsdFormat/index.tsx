import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import NumberFormat from 'react-number-format';

import Text from '@/components/common/Text';

interface Props {
  value?: string | number | null;
  style?: StyleProp<TextStyle>;
  decimalScale?: number;
  suffix?: string;
  numberOfLines?: number;
}

function UsdFormat({
  value,
  style,
  decimalScale = 2,
  suffix,
  numberOfLines,
}: Props) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale
      decimalScale={decimalScale}
      prefix="$"
      suffix={suffix ? ` ${suffix}` : undefined}
      renderText={(textValue: string) =>
        textValue ? (
          <Text numberOfLines={numberOfLines} type="body2" style={style}>
            {textValue}
          </Text>
        ) : null
      }
    />
  );
}

export default UsdFormat;
