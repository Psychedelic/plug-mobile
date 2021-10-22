import React from 'react';
import { Colors } from '../../constants/theme';
import { View } from 'react-native';

const Separator = () => (
  <View
    style={{
      height: 0,
      borderBottomColor: Colors.Gray.Secondary,
      borderBottomWidth: 1,
      width: '100%',
    }}
  />
);

export default Separator;
