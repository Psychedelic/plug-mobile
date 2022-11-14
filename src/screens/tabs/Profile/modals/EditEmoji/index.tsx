import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import EmojiSelector from '@/commonComponents/EmojiSelector';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import UserIcon from '@/commonComponents/UserIcon';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';

import styles from './styles';

interface Props {
  modalRef: React.RefObject<Modalize>;
  onSave: (emoji: string) => void;
  emoji?: string;
}

function EditEmoji({ modalRef, onSave, emoji }: Props) {
  const { t } = useTranslation();
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleSave = () => {
    onSave(selectedEmoji);
    setSelectedEmoji('');
    modalRef.current?.close();
  };

  useEffect(() => {
    if (emoji) {
      setSelectedEmoji(emoji);
    }
  }, [emoji]);

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      HeaderComponent={
        <Header
          center={<Text type="subtitle2">{t('accounts.setEmoji')}</Text>}
        />
      }>
      <View style={styles.content}>
        <UserIcon icon={selectedEmoji} size="extralarge" style={styles.icon} />
        <EmojiSelector onSelect={setSelectedEmoji} />
        <RainbowButton text={t('accounts.editEmoji')} onPress={handleSave} />
      </View>
    </Modal>
  );
}

export default EditEmoji;
