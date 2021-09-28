import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Switch, Button } from 'react-native';
import Container from '../../../components/common/Container';
import TextInput from '../../../components/common/TextInput';
import { Colors, FontStyles } from '../../../constants/theme';
import RainbowButton from '../../../components/buttons/RainbowButton';
import Header from '../../../components/common/Header';
import PlugLogo from '../../../assets/icons/plug-logo-full.png';
import Back from '../../../components/common/Back';

const CreatePassword = ({ route, navigation }) => {
  const { navigateTo } = route.params;
  const { goBack } = navigation;
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [faceId, setFaceId] = useState(false);
  const toggleSwitch = () => setFaceId(previousState => !previousState);

  const handleNextStep = () => {
    console.log(navigateTo)
    navigation.navigate(navigateTo);
  }

  return (
    <Container>

      <Header
        left={<Back onPress={() => goBack()} />}
        center={<View style={{ width: 70, height: 33 }}>
          <Image style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
          }} source={PlugLogo} />
        </View>}
      />

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

        <Text style={styles.help}>Must be at least 12 characters</Text>

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
          onPress={handleNextStep}
          disabled={
            !password ||
            !confirmPassword ||
            password !== confirmPassword ||
            password.length < 12
          }
        />

      </View>
    </Container>
  )
};

export default CreatePassword;

const styles = StyleSheet.create({
  title: {
    ...FontStyles.Title,
    marginTop: 20
  },
  subtitle: {
    ...FontStyles.NormalGray,
    marginTop: 5,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 35,
  },
  faceId: {
    ...FontStyles.NormalGray,
    fontSize: 16,
  },
  help: {
    ...FontStyles.SmallGray,
    alignSelf: 'flex-start',
    marginTop: 12
  }
});