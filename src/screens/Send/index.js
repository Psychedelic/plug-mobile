import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import TextInput from '../../components/common/TextInput';
import useContacts from '../../hooks/useContacts';
import ContactItem from '../../components/common/ContactItem';
import Modal from '../../components/modal';
import { Text } from 'react-native';
import useTokens from '../../hooks/useTokens';
import TokenItem from '../../components/tokens/TokenItem';

const Send = ({ modalRef }) => {
  const [to, setTo] = useState(null);
  const [validTo, setValidTo] = useState(false);
  const [selectedToken, setSelectedToken] = useState(false);

  useEffect(() => {
    if (to === 'chris') setValidTo(true);
  }, [to])


  return (
    <Modal modalRef={modalRef}>
      <Header
        center={<Text style={FontStyles.Subtitle2}>Send</Text>}
      />

      <TextInput
        label='To:'
        placeholder='Name, ICNS, or address'
        variant='innerLabel'
        value={to}
        onChangeText={setTo}
        autoFocus
      />

      {
        !validTo &&
        <ContactSection />
      }
      {
        (validTo && !selectedToken) &&
        <TokenSection />
      }


    </Modal>
  );
}

export default Send;

const ContactSection = () => {
  const { contacts } = useContacts();
  return (
    <>
      <Text style={[FontStyles.Subtitle3, { marginLeft: 20 }]}>Contacts</Text>
      {
        contacts.map(contact => (
          <ContactItem contact={contact} />
        ))
      }
    </>
  )
}

const TokenSection = () => {
  const { tokens } = useTokens();
  return (
    <>
      <Text style={[FontStyles.Subtitle3, { marginLeft: 20 }]}>Tokens</Text>
      {
        tokens.map(token => (
          <TokenItem {...token} />
        ))
      }
    </>
  )
}