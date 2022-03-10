import React from 'react';
import { Text } from 'react-native';

import Divider from '../../../../components/common/Divider';
import { FontStyles } from '../../../../constants/theme';
import Row from '../../../../components/layout/Row';
import styles from './styles';

function DepositDivider() {
  return (
    <Row>
      <Divider style={styles.divider} />
      <Text style={FontStyles.Subtitle3}>OR</Text>
      <Divider style={styles.divider} />
    </Row>
  );
}

export default DepositDivider;
