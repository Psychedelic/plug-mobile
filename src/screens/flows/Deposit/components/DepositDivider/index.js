import React from 'react';
import { Text } from 'react-native';

import { FontStyles } from '@constants/theme';
import { Row, Separator } from '@layout';

import styles from './styles';

function DepositDivider() {
  return (
    <Row>
      <Separator style={styles.divider} />
      <Text style={FontStyles.Subtitle3}>OR</Text>
      <Separator style={styles.divider} />
    </Row>
  );
}

export default DepositDivider;
