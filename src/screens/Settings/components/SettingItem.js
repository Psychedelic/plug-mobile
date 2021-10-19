import React from 'react';
import Touchable from '../../../components/animations/Touchable';
import Row from '../../../components/layout/Row';
import Column from '../../../components/layout/Column';
import { Text } from 'react-native';
import Icon from '../../../components/icons';
import { FontStyles, Colors } from '../../../constants/theme';

const SettingItem = ({ icon, name, description, onPress, border }) => (
  <Touchable onPress={onPress}>
    <Row
      style={[
        { paddingHorizontal: 20, paddingVertical: 20 },
        border && { borderBottomColor: Colors.Gray.Secondary, borderBottomWidth: 1 }
      ]}>
      <Text style={{ paddingRight: 9, fontSize: 18 }}>{icon}</Text>
      <Column>
        <Text style={[FontStyles.Normal, { marginBottom: 5 }]}>{name}</Text>
        <Text style={FontStyles.NormalGray}>{description}</Text>
      </Column>
      <Icon name='chevronRight' style={{ marginLeft: 'auto', alignSelf: 'center' }} />
    </Row>
  </Touchable>
);

export default SettingItem;
