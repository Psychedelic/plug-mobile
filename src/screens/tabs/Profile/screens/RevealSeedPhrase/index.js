import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Copy from '@/commonComponents/Copy';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import PasswordInput from '@/commonComponents/PasswordInput';
import SeedPhrase from '@/commonComponents/SeedPhrase';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import { isValidPassword } from '@/constants/general';
import { Column } from '@/layout';
import { validatePassword } from '@/redux/slices/keyring';

import styles from './styles';

function RevealSeedPhrase({ modalRef }) {
  const { t } = useTranslation();
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
      })
    );
  };

  return (
    <>
      <Modal modalRef={modalRef} onClose={clearState} adjustToContentHeight>
        <Header
          center={
            <Text type="subtitle2">{t('settings.items.phrase.name')}</Text>
          }
        />
        <Column style={styles.container}>
          {!loggedIn ? (
            <>
              <PasswordInput
                error={error}
                password={password}
                onChange={setPassword}
                onSubmit={handleSubmit}
              />
              <RainbowButton
                buttonStyle={styles.buttonStyle}
                text={t('common.continue')}
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
