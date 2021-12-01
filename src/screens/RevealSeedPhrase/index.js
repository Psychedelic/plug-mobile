import React, { useState } from 'react';
import Column from '../../components/layout/Column';
import Modal from '../../components/modal';
import { Text } from 'react-native';
import { FontStyles } from '../../constants/theme';
import Header from '../../components/common/Header';
import styles from './styles';
import SeedPhrase from '../../components/common/SeedPhrase';
import RainbowButton from '../../components/buttons/RainbowButton';
import TextInput from '../../components/common/TextInput';
import useKeyring from '../../hooks/useKeyring';
import { useSelector } from 'react-redux';

const RevealSeedPhrase = ({ modalRef }) => {

  const [password, setPassword] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  const { instance } = useSelector(state => state.keyring);

  const { unlock } = useKeyring();

  const clearState = () => {
    setPassword('');
    setError(false);
  };

  const handleSubmit = async () => {
    const unlocked = await unlock(password);
    if (unlocked) {
      clearState();
      setLoggedIn(true);
    } else {
      setError(true);
    }
  };

  console.log('insta', instance?.mnemonic)

  return (
    <>
      <Modal modalRef={modalRef} onClose={clearState} adjustToContentHeight>
        <Header center={<Text style={styles.title}>Reveal Seed Phrase</Text>} />

        <Column style={styles.container}>
          {
            !loggedIn
              ?
              <>
                <TextInput
                  value={password}
                  variant="password"
                  onChangeText={setPassword}
                  placeholder="Enter Password"
                  customStyle={styles.input}
                />

                {error && (
                  <Text style={styles.errorText}>The password is incorrect</Text>
                )}

                <RainbowButton
                  buttonStyle={{ marginTop: 20 }}
                  text="Continue"
                  onPress={handleSubmit}
                  disabled={
                    !password ||
                    password.length < 12
                  }
                />

              </>
              :
              <SeedPhrase
                mnemonic={instance?.mnemonic.split(' ') || []}
                onReveal={() => null}
              />
          }
        </Column>
      </Modal>
    </>
  );
};

export default RevealSeedPhrase;
