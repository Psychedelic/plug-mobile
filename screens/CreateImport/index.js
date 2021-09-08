import React, { useEffect } from 'react';
import { StatusBar, Text, SafeAreaView, View, Button } from 'react-native';
import LoaderHOC from '../../helpers/LoaderHOC';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/auth';

function CreateImport({ setLoading }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('create import');
    setLoading(false);
  }, []);

  const onClick = () => {
    dispatch(login(true));
  }

  return (
    <LinearGradient style={styles.root} colors={['rgba(255, 231, 1, 0.2)', 'rgba(250, 81, 211, 0.2)', 'rgba(16, 217, 237, 0.2)', 'rgba(82, 255, 83, 0.2)']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text>Welcome to Plug</Text>
        <Text>Choose if you want to create or import a wallet.</Text>
      </View>

      <View style={styles.actionCard}>
        <Text>Create Wallet</Text>
        <Text>Create a new wallet and Secret Recovery Phrase</Text>
        <Button title='Create Wallet' onClick={onClick}></Button>
      </View>

      <View style={styles.actionCard}>
        <Text>Import Wallet</Text>
        <Text>Import using 12 word Secret Recovery Phrase from an existing Plug wallet.</Text>
        <Button title='Import Wallet' onClick={onClick}></Button>
      </View>

    </LinearGradient>
  );
}

export default LoaderHOC(CreateImport, 'Verificando datos...');


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 24,
    paddingBottom: 75,
    paddingTop: 75
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  actionCard: {
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(255,255, 255, 0.4)',
    borderRadius: 15,
    width: '100%',
    marginBottom: 12,
    marginTop: 12,
    flex: 1,
    padding: 24,
    alignItems: 'center',
  }
});
