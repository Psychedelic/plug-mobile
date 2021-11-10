import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, StatusBar, Text } from 'react-native';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/common/TextInput';
import useKeyring from '../../hooks/useKeyring';
import Routes from '../../navigation/Routes';
import styles from './styles';

function Login() {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { unlock } = useKeyring();
  const handleSubmit = async () => {
    const unlocked = await unlock(password);
    if (unlocked) {
      navigation.navigate(Routes.SWIPE_LAYOUT);
    }
  };
  return (
    <View style={styles.flex}>
      <Text>PLUG</Text>
      <StatusBar barStyle="dark-content" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Enter password"
        variant="password"
        autoFocus
      />
      <Button text="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default Login;
