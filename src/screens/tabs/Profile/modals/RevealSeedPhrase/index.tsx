import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modalize } from 'react-native-modalize';

import Copy from '@/commonComponents/Copy';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import PasswordInput from '@/commonComponents/PasswordInput';
import SeedPhrase from '@/commonComponents/SeedPhrase';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import { isValidPassword } from '@/constants/general';
import { Column } from '@/layout';
import { useAppDispatch } from '@/redux/hooks';
import { getMnemonic } from '@/redux/slices/keyring';

import styles from './styles';

interface Props {
  modalRef: React.RefObject<Modalize>;
}

function RevealSeedPhrase({ modalRef }: Props) {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [words, setWords] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const clearState = () => {
    setPassword('');
    setError(false);
    setLoggedIn(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    dispatch(
      getMnemonic({
        password,
        onError: () => {
          setError(true);
          setLoading(false);
        },
        onSuccess: mnemonic => {
          clearState();
          setWords(mnemonic);
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
                value={password}
                onChangeText={setPassword}
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
              <SeedPhrase mnemonic={words?.split(' ') || []} />
              <Copy text={words} customStyle={styles.copyStyle} />
            </>
          )}
        </Column>
      </Modal>
    </>
  );
}

export default RevealSeedPhrase;
