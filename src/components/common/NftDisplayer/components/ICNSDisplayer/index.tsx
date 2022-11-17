import React from 'react';
import { View } from 'react-native';

import { Image, Text } from '@/components/common';
import { ICNS_LOGO } from '@/constants/urls';

import styles from './styles';

interface Props {
  ICNSName: string;
  size?: 'big' | 'small';
}

function ICNSDisplayer({ ICNSName, size = 'small' }: Props) {
  const isBigSize = size === 'big';

  return (
    <View style={[styles.ICNSContainer, isBigSize && styles.bigContainer]}>
      <Image
        url={ICNS_LOGO}
        resizeMode="contain"
        style={isBigSize ? styles.ICNSLogoBig : styles.ICNSLogo}
      />
      <Text
        type="headline1"
        numberOfLines={1}
        style={isBigSize ? styles.ICNSNameBig : styles.ICNSName}>
        {ICNSName}
      </Text>
    </View>
  );
}

export default ICNSDisplayer;
