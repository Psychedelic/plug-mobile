import React from 'react';
import { View } from 'react-native';

import Image from '@/components/common/Image';
import IncognitoLogo from '@/components/icons/svg/Incognito.svg';
import Icon from '@/icons';

import styles, { incognitoColor } from './styles';

interface Props {
  icon?: string;
  color?: string;
  logo?: string;
}

const TokenIcon = ({ icon, color, logo, ...props }: Props) => {
  return icon ? (
    <Icon name={icon} color={color} />
  ) : logo ? (
    <Image url={logo} style={styles.genericToken} />
  ) : (
    <View style={[styles.genericToken, styles.incognitoContainer]} {...props}>
      <IncognitoLogo fill={incognitoColor} width={34} height={34} />
    </View>
  );
};

export default TokenIcon;
