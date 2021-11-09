import React, { useEffect, useState, useRef } from 'react';
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
import { Keyboard } from 'react-native';
import ReviewSend from './components/ReviewSend';

const Send = ({ modalRef }) => {
  const [to, setTo] = useState(null);
  const [validTo, setValidTo] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedNft, setSelectedNft] = useState(null);

  const [tokenAmount, setTokenAmount] = useState(null);
  const [usdAmount, setUsdAmount] = useState(null);

  const reviewRef = useRef(null);

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

  const onNftPress = nft => {
    setSelectedNft(nft);
    onReview();
  };

  const resetState = () => {
    setTo(null);
    setValidTo(false);
    setSelectedNft(null);
    setSelectedToken(null);
    setSelectedContact(null);
  };

  const onChangeText = text => {
    setSelectedContact(null);
    setTo(text);
  };

  const onReview = () => {
    Keyboard.dismiss();
    reviewRef.current?.open();
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

        {validTo && !selectedToken && (
          <TokenSection onTokenPress={onTokenPress} onNftPress={onNftPress} />
        )}

        {validTo && selectedToken && (
          <AmountSection
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            tokenAmount={tokenAmount}
            setTokenAmount={setTokenAmount}
            usdAmount={usdAmount}
            setUsdAmount={setUsdAmount}
            onReview={onReview}
          />
        )}

        <ReviewSend
          modalRef={reviewRef}
          adjustToContentHeight
          token={selectedToken}
          to={to}
          contact={selectedContact}
          amount={tokenAmount}
          value={usdAmount}
          nft={selectedNft}
          onClose={() => modalRef.current?.close()}
        />
      </ScrollView>
    </Modal>
  );
};

export default Send;
