import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Text } from 'react-native';

import RainbowButton from '@components/buttons/RainbowButton';
import PasswordInput from '@commonComponents/PasswordInput';
import { validatePassword } from '@redux/slices/keyring';
import SeedPhrase from '@commonComponents/SeedPhrase';
import { isValidPassword } from '@constants/general';
import Column from '@components/layout/Column';
import Header from '@commonComponents/Header';
import Copy from '@commonComponents/Copy';
import Modal from '@components/modal';

import styles from './styles';

function RevealSeedPhrase({ modalRef }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const { instance } = useSelector(state => state.keyring);

  const clearState = () => {
    setPassword('');
    setError(false);
    setLoggedIn(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    dispatch(
      validatePassword({
        password,
        onError: () => {
          setError(true);
          setLoading(false);
        },
        onSuccess: () => {
          clearState();
          setLoggedIn(true);
          setLoading(false);
        },
      }),
    );
  };

  return (
    <>
      <Modal modalRef={modalRef} onClose={clearState} adjustToContentHeight>
        <Header center={<Text style={styles.title}>Seed Phrase</Text>} />
        <Column style={styles.container}>
          {!loggedIn ? (
            <>
              <PasswordInput
                error={error}
                password={password}
                onChange={setPassword}
              />
              <RainbowButton
                buttonStyle={styles.buttonStyle}
                text="Continue"
                loading={loading}
                onPress={handleSubmit}
                disabled={!isValidPassword(password)}
              />
            </>
          ) : (
            <>
              <SeedPhrase
                mnemonic={instance?.state?.mnemonic.split(' ') || []}
              />
              <Copy
                text={instance?.state?.mnemonic}
                customStyle={styles.copyStyle}
              />
            </>
          )}
        </Column>
      </Modal>
    </>
  );
}

export default RevealSeedPhrase;
