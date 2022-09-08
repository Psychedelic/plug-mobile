import React from 'react';
import { View } from 'react-native';

import Image from '@/commonComponents/Image';
import Text from '@/commonComponents/Text';
import { ICNS_LOGO } from '@/services/ICNS';

import styles from './styles';

interface Props {
  ICNSName: string;
  isDetailView?: boolean;
}

function ICNSDisplayer({ ICNSName, isDetailView }: Props) {
  return (
    <View style={styles.ICNSContainer}>
      <Image
        url={ICNS_LOGO}
        resizeMode="contain"
        style={[styles.ICNSLogo, isDetailView && styles.ICNSLogoDetailView]}
      />
      <Text
        type="headline1"
        numberOfLines={1}
        style={[styles.ICNSName, isDetailView && styles.ICNSNameDetailView]}>
        {ICNSName}
      </Text>
    </View>
  );
}

export default ICNSDisplayer;
