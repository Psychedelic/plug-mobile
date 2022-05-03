import React from 'react';
import { Text } from 'react-native';

import Touchable from '@components/animations/Touchable';
import Column from '@components/layout/Column';
import { FontStyles } from '@constants/theme';
import Row from '@components/layout/Row';
import Icon from '@components/icons';

import styles from './styles';

const SettingItem = ({ icon, name, description, onPress, iconName }) => (
  <Touchable onPress={onPress}>
    <Row style={styles.container}>
      {iconName ? (
        <Icon name={iconName} style={styles.iconName} />
      ) : (
        <Text style={styles.icon}>{icon}</Text>
      )}
      <Column style={{ marginLeft: 9 }}>
        <Text style={[FontStyles.Normal, styles.name]}>{name}</Text>
        <Text style={FontStyles.NormalGray}>{description}</Text>
      </Column>
      <Icon name="chevronRight" style={styles.chevron} />
    </Row>
  </Touchable>
);

export default SettingItem;
