import React, { useMemo } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export type TextTypes =
  | 'headline1'
  | 'headline2'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline'
  | 'normal'
  | 'error';

export interface TextProps extends RNTextProps {
  type?: TextTypes;
}

import styles from './styles';

function Text({ style, type, ...props }: TextProps) {
  const baseStyle = useMemo(
    () => (type ? [styles.base, styles[type], style] : [styles.base, style]),
    [type, style]
  );

  return <RNText style={baseStyle} {...props} />;
}

export default Text;
