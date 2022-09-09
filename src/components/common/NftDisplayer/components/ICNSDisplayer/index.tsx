import React from 'react';
import { View } from 'react-native';

import { Image, Text } from '@/components/common';
import { ICNS_LOGO } from '@/services/ICNS';

import styles from './styles';

interface Props {
  ICNSName: string;
  size?: 'small' | 'big';
}

function ICNSDisplayer({ ICNSName, size = 'small' }: Props) {
  const isBigSize = size === 'big';

  return (
    <View style={styles.ICNSContainer}>
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
