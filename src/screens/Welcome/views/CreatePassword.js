import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import Container from '../../../components/common/Container';
import TextInput from '../../../components/common/TextInput';
import { Colors, FontStyles } from '../../../constants/theme';
import RainbowButton from '../../../components/buttons/RainbowButton';
import { useNavigation } from '@react-navigation/core';
import Routes from '../../../navigation/Routes';

const CreatePassword = () => {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [faceId, setFaceId] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => setFaceId(previousState => !previousState);

  const onPress = () => navigation.navigate(Routes.BACKUP_SEED_PHRASE);

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Create Password</Text>
        <Text style={styles.subtitle}>Please create a secure password that you will remember.</Text>

        <TextInput
          value={password}
          variant='password'
          onChangeText={setPassword}
          placeholder='Password'
          customStyle={{ backgroundColor: Colors.Gray.Secondary, marginTop: 28 }}
        />

        <TextInput
          value={confirmPassword}
          variant='password'
          onChangeText={setConfirmPassword}
          placeholder='Confirm Password'
          customStyle={{ backgroundColor: Colors.Gray.Secondary, marginTop: 22 }}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.faceId}>Sign in with Face ID?</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={faceId}
          />
        </View>
        <RainbowButton
          buttonStyle={styles.componentMargin}
          text="Continue"
          onPress={onPress}
        />

      </View>
    </Container>
  )
};

export default CreatePassword;

const styles = StyleSheet.create({
  title: {
    ...FontStyles.Title,
    marginTop: 20,
  },
  subtitle: {
    ...FontStyles.NormalGray,
    marginTop: 5,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  switchContainer:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 35,
  },
  faceId:{
    ...FontStyles.NormalGray,
    fontSize: 16,
  }
});