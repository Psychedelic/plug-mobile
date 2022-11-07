import React from 'react';

import animationScales from '@/utils/animationScales';

import Text, { TextTypes } from '../Text';
import Touchable from '../Touchable';
import styles from './styles';

interface Props {
  onPress: () => void;
  label: string;
  type?: TextTypes;
}

function ActionButton({ onPress, label, type = 'body1' }: Props) {
  return (
    <Touchable
      onPress={onPress}
      style={styles.container}
      scale={animationScales.medium}>
      <Text type={type} style={styles.text}>
        {label}
      </Text>
    </Touchable>
  );
}

export default ActionButton;
