import React, { useMemo } from 'react';
import { Text as RNText, TextProps } from 'react-native';

type Type =
  | 'title'
  | 'title2'
  | 'subtitle'
  | 'subtitle2'
  | 'subtitle3'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

interface Props extends TextProps {
  type: Type;
}

import styles from './styles';

function Text({ style, type, ...props }: Props) {
  const baseStyle = useMemo(
    () => [styles.base, styles[type], style],
    [type, style]
  );

  return <RNText style={baseStyle} {...props} />;
}

export default Text;
