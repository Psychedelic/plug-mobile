import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Button from '@/components/buttons/Button';
import { ActionButton } from '@/components/common';
import Text from '@/components/common/Text';

import styles from './styles';

interface Props {
  modalRef: React.RefObject<Modalize>;
  onDelete: () => void;
}

function DeleteWallet({ modalRef, onDelete }: Props) {
  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      HeaderComponent={
        <Header
          center={<Text type="subtitle2">{t('deleteWallet.title')}</Text>}
          right={
            <ActionButton
              label={t('common.close')}
              onPress={() => modalRef.current?.close()}
            />
          }
        />
      }>
      <View style={styles.container}>
        <Text type="body1" style={styles.text}>
          {t('deleteWallet.question')}
        </Text>
        <Text type="body1" style={[styles.text, styles.description]}>
          {t('deleteWallet.description')}
        </Text>
        <Button
          text={t('deleteWallet.action')}
          onPress={onDelete}
          buttonStyle={styles.button}
        />
      </View>
    </Modal>
  );
}

export default DeleteWallet;
