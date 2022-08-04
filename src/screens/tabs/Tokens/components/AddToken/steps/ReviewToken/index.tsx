import React from 'react';
import { View } from 'react-native';

import { DABToken } from '@/interfaces/dab';

interface Props {
  token?: DABToken;
}

export function ReviewToken({ token }: Props) {
  return (
    <View
      style={{ flex: 1, height: 100, width: 100, backgroundColor: 'blue' }}
    />
  );
}
