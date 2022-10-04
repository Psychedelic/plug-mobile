import emojis from 'emoji-datasource';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { charFromEmojiObject } from '@/commonComponents/EmojiSelector/utils';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import TextInput from '@/commonComponents/TextInput';
import UserIcon from '@/commonComponents/UserIcon';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import ErrorIcon from '@/components/icons/svg/ErrorIcon.svg';
import { FontStyles } from '@/constants/theme';
import useICNS from '@/hooks/useICNS';
import { addContact, editContact } from '@/redux/slices/user';
import {
  validateAccountId,
  validateICNSName,
  validatePrincipalId,
} from '@/utils/ids';

import EditEmoji from '../../../EditEmoji';
import styles from './styles';

const AddEditContact = ({ modalRef, contact, onClose, contactsRef }) => {
  const { t } = useTranslation();
  const { contacts } = useSelector(state => state.user);
  const editEmojiRef = useRef(null);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState(false);
  const isEditContact = !!contact;
  const title = isEditContact
    ? t('contacts.editContact')
    : t('contacts.addContact');

  const { loading, isValid: isValidICNS, resolvedAddress } = useICNS(id, '');
  const isValidAddress = validatePrincipalId(id) || validateAccountId(id);
  const validId = isValidAddress || isValidICNS;

  const isButtonDisabled = error || !name || !id || !validId;
  const savedContact = contacts.find(c => c.id === id);
  const savedContactName = contacts.find(c => c.name === name);
  const nameError = savedContactName && contact?.name !== name;
  const idError = savedContact && contact?.id !== id;
  const icnsError = useMemo(
    () =>
      validateICNSName(id) && (isValidAddress || resolvedAddress === undefined),
    [resolvedAddress, isValidAddress]
  );

  useEffect(() => {
    if (idError || nameError || icnsError) {
      setError(true);
    } else {
      setError(false);
    }
  }, [idError, nameError, icnsError]);
  const handleSubmit = () => {
    const randomEmoji = charFromEmojiObject(
      emojis[Math.floor(Math.random() * emojis.length)]
    );
    dispatch(
      isEditContact
        ? editContact({ contact, newContact: { id, name, image: emoji } })
        : addContact({
            contact: {
              id,
              name,
              image: randomEmoji,
            },
          })
    );
    modalRef.current?.close();
    clearState();
  };
  const clearState = () => {
    setName('');
    setId('');
    setEmoji('');
    setError(false);
  };

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setId(contact.id);
      setEmoji(contact.image);
    } else {
      clearState();
    }
  }, [contact]);

  const handleClose = () => {
    onClose?.();
    setError(false);
    if (!contact) {
      clearState();
    }
  };

  const onEditEmoji = () => {
    Keyboard.dismiss();
    editEmojiRef?.current.open();
  };

  const closeModal = () => {
    setError(false);
    modalRef?.current.close();
    contactsRef?.current.close();
  };

  const handleBack = () => {
    setError(false);
    modalRef?.current.close();
  };

  const handleOnChangeName = text => {
    setError(false);
    setName(text);
  };

  const handleOnChangeId = text => {
    setError(false);
    setId(text);
  };

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClose={handleClose}>
      <Header
        right={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={closeModal}>
            {t('common.close')}
          </Text>
        }
        left={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
            {t('common.back')}
          </Text>
        }
        center={<Text type="subtitle2">{title}</Text>}
      />
      <View style={styles.container}>
        {isEditContact && (
          <View style={styles.emojiContainer}>
            <UserIcon
              icon={emoji || contact?.image}
              size="extralarge"
              onPress={onEditEmoji}
            />
          </View>
        )}
        <TextInput
          autoFocus
          value={name}
          maxLength={22}
          placeholder={t('contacts.namePlaceholder')}
          onChangeText={handleOnChangeName}
        />
        <TextInput
          value={id}
          autoCapitalize="none"
          onChangeText={handleOnChangeId}
          placeholder={t('contacts.idPlaceholder')}
          style={styles.marginedContainer}
        />
        {error && (
          <View style={styles.errorContainer}>
            <ErrorIcon style={styles.errorIcon} />
            <Text style={styles.errorMessage}>
              {nameError
                ? t('contacts.nameTaken')
                : icnsError
                ? t('contacts.unresolvedICNS')
                : t('contacts.contactAlreadySaved', {
                    value: savedContact?.name,
                  })}
            </Text>
          </View>
        )}
        <RainbowButton
          text={title}
          loading={loading}
          onPress={handleSubmit}
          disabled={isButtonDisabled}
          textStyle={styles.capitalized}
          buttonStyle={styles.marginedContainer}
        />
      </View>
      <EditEmoji
        modalRef={editEmojiRef}
        onSave={setEmoji}
        emoji={emoji || contact?.image}
      />
    </Modal>
  );
};

export default AddEditContact;
