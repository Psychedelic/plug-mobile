import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import TextInput from '../../components/common/TextInput';
import Modal from '../../components/modal';
import { Text, ScrollView } from 'react-native';
import styles from './styles';
import { validatePrincipalId, validateAccountId } from '../../helpers/ids';
import AmountSection from './components/AmountSection';
import ContactSection from './components/ContactSection';
import TokenSection from './components/TokenSection';

const Send = ({ modalRef }) => {
  const [to, setTo] = useState(null);
  const [validTo, setValidTo] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  useEffect(() => {
    if (selectedContact) {
      setValidTo(true);
    } else if (to) {
      setValidTo(validatePrincipalId(to) || validateAccountId(to));
    }
  }, [to, selectedContact]);

  const onContactPress = contact => {
    setTo(null);
    setSelectedContact(contact);
  };

  const onTokenPress = token => {
    setSelectedToken(token);
  };

  const resetState = () => {
    setTo(null);
    setValidTo(false);
    setSelectedToken(null);
    setSelectedContact(null);
  };

  const onChangeText = text => {
    setSelectedContact(null);
    setTo(text);
  };

  return (
    <Modal modalRef={modalRef} onClose={resetState}>
      <Header center={<Text style={FontStyles.Subtitle2}>Send</Text>} />
      <ScrollView style={styles.content} keyboardShouldPersistTaps="always">
        <TextInput
          label="To:"
          placeholder="Name, ICNS, or address"
          variant="innerLabel"
          value={selectedContact ? selectedContact.name : to}
          onChangeText={onChangeText}
          textStyle={validTo ? styles.valid : null}
          autoFocus
        />
        {!validTo && <ContactSection onPress={onContactPress} />}
        {validTo && !selectedToken && <TokenSection onPress={onTokenPress} />}
        {validTo && selectedToken && (
          <AmountSection
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            selectedContact={selectedContact}
            to={to}
            parentModalRef={modalRef}
          />
        )}
      </ScrollView>
    </Modal>
  );
};

export default Send;
