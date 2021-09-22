import React, { useEffect } from 'react';
import { View, StatusBar, Text } from 'react-native';
import styles from './styles';

function Login({ setLoading }) {
  useEffect(() => {
    console.log('login');
    setLoading(false);
  }, [setLoading]);

  return (
    <View style={styles.flex}>
      <Text>PLUG</Text>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

export default Login;
