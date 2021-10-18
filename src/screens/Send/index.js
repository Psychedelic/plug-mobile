import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import TextInput from '../../components/common/TextInput';
import useContacts from '../../hooks/useContacts';
import ContactItem from '../../components/common/ContactItem';
import Modal from '../../components/modal';
import { Text, ScrollView, Keyboard } from 'react-native';
import useTokens from '../../hooks/useTokens';
import TokenItem from '../../components/tokens/TokenItem';
import styles from './styles';
import Touchable from '../../components/animations/Touchable';
import animationScales from '../../utils/animationScales';
import AmountInput from '../../components/common/AmountInput';
import RainbowButton from '../../components/buttons/RainbowButton';
import ReviewSend from './components/ReviewSend';
import { validatePrincipalId, validateAccountId } from '../../helpers/ids';

const Send = ({ modalRef }) => {
  const [to, setTo] = useState(null);
  const [validTo, setValidTo] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null)
  const [selectedToken, setSelectedToken] = useState(null);

  useEffect(() => {

    if (selectedContact) {
      setValidTo(true);
    }
    else {
      setValidTo(validatePrincipalId(to) || validateAccountId(to))
    }
  }, [to, selectedContact]);

  const onContactPress = (contact) => {
    setTo(null);
    setSelectedContact(contact);
  }

  const onTokenPress = (token) => {
    setSelectedToken(token);
  };

  const resetState = () => {
    setTo(null);
    setValidTo(false);
    setSelectedToken(null);
    setSelectedContact(null);
  }

  const onChangeText = (text) => {
    setSelectedContact(null);
    setTo(text);
  }

  return (
    <Modal modalRef={modalRef} onClose={resetState}>
      <Header
        center={<Text style={FontStyles.Subtitle2}>Send</Text>}
      />
      <ScrollView style={styles.content} keyboardShouldPersistTaps='always'>
        <TextInput
          label='To:'
          placeholder='Name, ICNS, or address'
          variant='innerLabel'
          value={selectedContact ? selectedContact.name : to}
          onChangeText={onChangeText}
          textStyle={validTo ? styles.valid : null}
          autoFocus
        />
        {
          !validTo &&
          <ContactSection
            onPress={onContactPress}
          />
        }
        {
          validTo && !selectedToken &&
          <TokenSection
            onPress={onTokenPress}
          />
        }
        {
          validTo && selectedToken &&
          <AmountSection
            selectedToken={selectedToken}
            selectedContact={selectedContact}
            to={to}
            parentModalRef={modalRef}
          />
        }
      </ScrollView>
    </Modal>
  );
}

export default Send;

const ContactSection = ({ onPress }) => {
  const { contacts } = useContacts();
  return (
    <>
      <Text style={[FontStyles.Subtitle3]}>Contacts</Text>
      {
        contacts.map(contact => (
          <ContactItem
            onPress={() => onPress(contact)}
            contact={contact}
            style={{ marginTop: 15 }}
          />
        ))
      }
    </>
  )
}

const TokenSection = ({ onPress }) => {
  const { tokens } = useTokens();
  return (
    <>
      <Text style={FontStyles.Subtitle3}>Tokens</Text>
      {
        tokens.map(token => (
          <Touchable
            scale={animationScales.small}
            onPress={() => onPress(token)}
          >
            <TokenItem {...token} color='#292929' style={{ marginTop: 20 }} />
          </Touchable>
        ))
      }
    </>
  )
}

const AmountSection = ({ selectedToken, parentModalRef }) => {
  const [tokenAmount, setTokenAmount] = useState(null);
  const [usdAmount, setUsdAmount] = useState(null);

  const [selectedInput, setSelectedInput] = useState('USD');

  useEffect(() => {
    if (usdAmount) {
      setTokenAmount(String(usdAmount / selectedToken.value))
    }
  }, [usdAmount])

  useEffect(() => {
    if (tokenAmount) {
      setUsdAmount(String(tokenAmount * selectedToken.value))
    }
  }, [tokenAmount])

  const modalRef = useRef(null);

  const onReview = () => {
    Keyboard.dismiss();
    modalRef.current?.open();
  }

  return (
    <>
      <TokenItem {...selectedToken} color='#292929' />

      <AmountInput
        value={tokenAmount}
        onChange={setTokenAmount}
        maxAmount={selectedToken.amount}
        selected={selectedInput === selectedToken.symbol}
        setSelected={setSelectedInput}
        symbol={selectedToken.symbol}
        customStyle={{ marginBottom: 25, marginTop: 25, }}
      />

      <AmountInput
        value={usdAmount}
        onChange={setUsdAmount}
        maxAmount={selectedToken.value * selectedToken.amount}
        selected={selectedInput === 'USD'}
        setSelected={setSelectedInput}
        symbol='USD'
        autoFocus
        customStyle={{ marginBottom: 25 }}
      />

      <RainbowButton
        text='Review Send'
        onPress={onReview}
        disabled={!tokenAmount || !usdAmount}
      />

      <ReviewSend
        modalRef={modalRef}
        adjustToContentHeight
        token={selectedToken}
        onClose={() => parentModalRef.current?.close()}
      />
    </>
  )
}
