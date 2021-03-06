import React from 'react';
import { Text, View } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import { FontStyles } from '@/constants/theme';

const containerStyle = { height: 40, justifyContent: 'center' };

const InfoItem = ({ name, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={containerStyle}>
      <Text style={FontStyles.Normal}>{name}</Text>
    </View>
  </Touchable>
);

export default InfoItem;
