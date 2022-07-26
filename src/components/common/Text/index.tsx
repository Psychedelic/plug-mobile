import React, { useMemo } from 'react';
import { Text as RNText, TextProps } from 'react-native';

type Type =
  | 'headline1'
  | 'headline2'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

interface Props extends TextProps {
  type?: Type;
}

import styles from './styles';

function Text({ style, type, ...props }: Props) {
  const baseStyle = useMemo(
    () => (type ? [styles.base, styles[type], style] : [styles.base, style]),
    [type, style]
  );

  return <RNText style={baseStyle} {...props} />;
}

export default Text;
