import React from 'react';

import Touchable from '@/commonComponents/Touchable';
import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import { Column, Row } from '@/layout';

import styles from './styles';

interface Props {
  name: string;
  description: string;
  onPress: () => void;
  icon?: string;
  iconName?: string;
}

const SettingItem = ({ icon, name, description, onPress, iconName }: Props) => (
  <Touchable onPress={onPress}>
    <Row style={styles.container}>
      {iconName ? (
        <Icon name={iconName} style={styles.iconName} />
      ) : (
        <Text style={styles.icon}>{icon}</Text>
      )}
      <Column style={styles.column}>
        <Text style={[FontStyles.Normal, styles.name]}>{name}</Text>
        <Text style={FontStyles.NormalGray}>{description}</Text>
      </Column>
      <Icon name="chevronRight" style={styles.chevron} height={18} />
    </Row>
  </Touchable>
);

export default SettingItem;
