import React from 'react';
import Touchable from '../../../components/animations/Touchable';
import { View, Text } from 'react-native';
import { FontStyles } from '../../../constants/theme';

const InfoItem = ({ name, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={{ height: 40, justifyContent: 'center' }}>
      <Text style={FontStyles.Normal}>{name}</Text>
    </View>
  </Touchable>
);

export default InfoItem;
