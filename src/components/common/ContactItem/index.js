import { View, Text } from 'react-native';
import React from 'react';

import animationScales from '../../../utils/animationScales';
import shortAddress from '../../../helpers/short-address';
import { FontStyles } from '../../../constants/theme';
import Touchable from '../../animations/Touchable';
import UserIcon from '../UserIcon';
import styles from './styles';

const ContactItem = ({ contact, onPress, onLongPress, ...props }) => {
  const { image, name, id } = contact;

  return (
    <View {...props}>
      <Touchable
        scale={animationScales.small}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.root}>
          <UserIcon icon={image} disabled />
          <View style={styles.leftContainer}>
            <Text style={FontStyles.Normal}>{name}</Text>
            <Text style={FontStyles.NormalGray}>{shortAddress(id)}</Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

export default ContactItem;
