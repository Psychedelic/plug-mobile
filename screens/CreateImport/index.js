import React, { useEffect } from 'react';
import { StatusBar, Text, SafeAreaView } from 'react-native';

import LoaderHOC from '../../helpers/LoaderHOC';

import styles from './styles';

function Login({ setLoading }) {
  useEffect(() => {
    console.log('login');
    setLoading(false);
  }, [setLoading]);
  return (
    <SafeAreaView style={styles.flex}>
      <Text>CREATE IMPORT</Text>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}

export default LoaderHOC(Login, 'Verificando datos...');
