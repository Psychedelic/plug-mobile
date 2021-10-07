import React from 'react';
import { View, Text } from 'react-native';
import { FontStyles } from '../../../constants/theme';
import UserIcon from '../UserIcon';
import shortAddress from '../../../helpers/short-address';
import styles from './styles';
import Touchable from '../../animations/Touchable';
import animationScales from '../../../utils/animationScales';

const ContactItem = ({ contact }) => {
  const { image, name, id } = contact;

  return (
    <Touchable scale={animationScales.small}>
      <View style={styles.root}>
        <UserIcon icon={image} disabled />
        <View style={styles.leftContainer}>
          <Text style={FontStyles.Normal}>{name}</Text>
          <Text style={FontStyles.NormalGray}>{shortAddress(id)}</Text>
        </View>
      </View>
    </Touchable>
  )
};

export default ContactItem;
