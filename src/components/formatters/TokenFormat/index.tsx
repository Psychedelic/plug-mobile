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
}

function TokenFormat({ value, token, style, decimalScale }: Props) {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      fixedDecimalScale
      decimalScale={decimalScale || (value && value > 0) ? VISIBLE_DECIMALS : 2}
      suffix={` ${token}`}
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

export default TokenFormat;
