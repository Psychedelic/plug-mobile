import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import NumberFormat from 'react-number-format';

import Text from '@/components/common/Text';

interface Props {
  value?: string | number | null;
  style?: StyleProp<TextStyle>;
  decimalScale?: number;
}

function UsdFormat({ value, style, decimalScale = 2 }: Props) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale
      decimalScale={decimalScale}
      prefix="$"
      renderText={textValue =>
        textValue ? (
          <Text type="body2" style={style}>
            {textValue}
          </Text>
        ) : null
      }
    />
  );
}

export default UsdFormat;
