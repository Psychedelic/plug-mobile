import React from 'react';
import Touchable from '../../../components/animations/Touchable';
import Row from '../../../components/layout/Row';
import Column from '../../../components/layout/Column';
import { StyleSheet, Text } from 'react-native';
import Icon from '../../../components/icons';
import { FontStyles } from '../../../constants/theme';

const SettingItem = ({ icon, name, description, onPress }) => (
  <Touchable onPress={onPress}>
    <Row style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Column>
        <Text style={[FontStyles.Normal, { marginBottom: 5 }]}>{name}</Text>
        <Text style={FontStyles.NormalGray}>{description}</Text>
      </Column>
      <Icon name="chevronRight" style={styles.chevron} />
    </Row>
  </Touchable>
);

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  icon: {
    paddingRight: 9,
    fontSize: 18,
  },
  chevron: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
});
