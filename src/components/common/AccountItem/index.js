import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { FontStyles } from '../../../constants/theme';
import UserIcon from '../UserIcon';
import shortAddress from '../../../helpers/short-address';
import styles from './styles';
import Touchable from '../../animations/Touchable';
import animationScales from '../../../utils/animationScales';
import Icon from '../../icons';

const AccountItem = ({ account, onPress, onMenu, ...props }) => {
  const { icon, name, principal } = account;

  return (
    <View {...props} style={{ marginBottom: 20 }}>
      <Touchable scale={animationScales.small} onPress={onPress} onLongPress={onMenu}>
        <View style={styles.container}>
          <UserIcon icon={icon} disabled />
          <View style={styles.leftContainer}>
            <Text style={FontStyles.Normal}>{name}</Text>
            <Text style={FontStyles.NormalGray}>
              {shortAddress(principal)}
            </Text>
          </View>

          <View style={styles.threeDots}>
            <Touchable onPress={onMenu} scale={animationScales.large}>
              <Icon name="threeDots" />
            </Touchable>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

export default AccountItem;
