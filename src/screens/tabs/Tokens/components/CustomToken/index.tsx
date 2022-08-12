import { t } from 'i18next';
import React, { useMemo, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch } from 'react-redux';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import ActionButton from '@/components/common/ActionButton';
import ActionSheet from '@/components/common/ActionSheet';
import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import TextInput from '@/components/common/TextInput';
import { FungibleStandard } from '@/interfaces/keyring';
import { getTokenInfo } from '@/redux/slices/user';

import styles from './styles';

interface Props {
  modalRef: React.RefObject<Modalize>;
}

function CustomToken({ modalRef }: Props) {
  const [canisterId, setCanisterId] = useState('');
  const dispatch = useDispatch();
  const [standard, setStandard] = useState<FungibleStandard>();
  const optionsRef = useRef<Modalize>(null);

  const clearValues = () => {
    setCanisterId('');
    setStandard(undefined);
  };

  const handleClose = () => {
    modalRef?.current?.close();
    clearValues();
  };

  const handleSubmit = () => {
    //validate canisterId
    dispatch(getTokenInfo({ canisterId, standard }));
  };

  const standardList = useMemo(
    () => [
      {
        id: 1,
        label: 'DIP20',
        onPress: () => setStandard('DIP20'),
      },
      {
        id: 2,
        label: 'EXT',
        onPress: () => setStandard('EXT'),
      },
    ],
    [setStandard]
  );

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClosed={clearValues}>
      <Header
        center={
          <Text style={styles.title} type="subtitle3">
            {t('addToken.customTokenTitle')}
          </Text>
        }
        right={<ActionButton label={t('common.close')} onPress={handleClose} />}
      />
      <View style={styles.container}>
        <TextInput
          placeholder={t('addToken.customTokenId')}
          value={canisterId}
          onChangeText={setCanisterId}
          blurOnSubmit
          onBlur={Keyboard.dismiss}
        />
        <Button
          text={standard || t('addToken.customTokenStandard')}
          onPress={() => optionsRef?.current?.open()}
          buttonStyle={styles.standardInput}
          textStyle={
            standard ? styles.standardText : styles.standardTextPlaceholder
          }
          iconStyle={styles.standardIcon}
          iconName="chevronRight" // TODO: Modify button to receive the icon as prop
        />
        <RainbowButton
          text={t('common.continue')}
          buttonStyle={styles.button}
          onPress={handleSubmit}
        />
        <ActionSheet
          modalRef={optionsRef}
          showIcons={false}
          options={standardList}
        />
      </View>
    </Modal>
  );
}

export default CustomToken;
