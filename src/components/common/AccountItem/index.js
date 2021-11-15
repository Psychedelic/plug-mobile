import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { FontStyles } from '../../../constants/theme';
import UserIcon from '../UserIcon';
import shortAddress from '../../../helpers/short-address';
import styles from './styles';
import Touchable from '../../animations/Touchable';
import animationScales from '../../../utils/animationScales';
import Icon from '../../icons';
import CreateAccount from '../../../modals/CreateAccount';

const AccountItem = ({ account, onPress, onMenu, ...props }) => {
<<<<<<< HEAD
  const { icon, name, principal } = account;
=======
  const { icon, name, principalId } = account;
  const iconPress = useRef(null);

  const onIconPress = () => {
    iconPress?.current.open();
  };
>>>>>>> 0f3af64147b233f5923b978113b28a7618718abb

  return (
    <View {...props} style={{ marginBottom: 20 }}>
      <Touchable scale={animationScales.small} onPress={onPress}>
        <View style={styles.container}>
          <UserIcon icon={icon} onPress={onIconPress} disabled />
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
      <CreateAccount modalRef={iconPress} title="Edit Account" />
    </View>
  );
};

export default AccountItem;
