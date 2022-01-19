import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Text } from 'react-native';

import RainbowButton from '../../components/buttons/RainbowButton';
import PasswordInput from '../../components/common/PasswordInput';
import SeedPhrase from '../../components/common/SeedPhrase';
import Column from '../../components/layout/Column';
import Header from '../../components/common/Header';
import useKeyring from '../../hooks/useKeyring';
import Copy from '../../components/common/Copy';
import Modal from '../../components/modal';
import styles from './styles';

const RevealSeedPhrase = ({ modalRef }) => {
  const [password, setPassword] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { instance } = useSelector(state => state.keyring);

  const { unlock } = useKeyring();

  const clearState = () => {
    setPassword('');
    setError(false);
    setLoggedIn(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const unlocked = await unlock(password);
    if (unlocked) {
      clearState();
      setLoggedIn(true);
    } else {
      setError(true);
    }
    setLoading(false);
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
                disabled={!password || password.length < 12}
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
};

export default RevealSeedPhrase;
