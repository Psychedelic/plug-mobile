import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import TextInput from '../../components/common/TextInput';
import Modal from '../../components/modal';
import { Text, ScrollView } from 'react-native';
import styles from './styles';
import {
  validatePrincipalId,
  validateAccountId,
  validateCanisterId,
} from '../../helpers/ids';
import AmountSection from './components/AmountSection';
import ContactSection from './components/ContactSection';
import TokenSection from './components/TokenSection';
import { Keyboard } from 'react-native';
import ReviewSend from './components/ReviewSend';
import { useICPPrice } from '../../redux/slices/icp';
import { USD_PER_TC } from '../../utils/assets';
import { ADDRESS_TYPES } from '../../constants/addresses';
import { useSelector } from 'react-redux';
import XTC_OPTIONS from '../../constants/xtc';
import { DEFAULT_FEE, XTC_FEE } from '../../constants/addresses';
import { burnXtc, sendToken, setTransaction, transferNFT } from '../../redux/slices/keyring';
import { useDispatch } from 'react-redux';

const INITIAL_ADDRESS_INFO = { isValid: null, type: null };

const Send = ({ modalRef }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState(null);
  const [addressInfo, setAddressInfo] = useState(INITIAL_ADDRESS_INFO);

  const { assets, principalId, accountId, transaction, collections } = useSelector(
    state => state.keyring,
  );

  const nfts =
    collections?.flatMap(collection => collection?.tokens || []) || [];

  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedNft, setSelectedNft] = useState(null);
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(null);

  const [tokenAmount, setTokenAmount] = useState(null);
  const [usdAmount, setUsdAmount] = useState(null);

  const icpPrice = useICPPrice();

  const [destination, setDestination] = useState(XTC_OPTIONS.SEND);
  const [sendingXTCtoCanister, setSendingXTCtoCanister] = useState(false);

  const [sendError, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const reviewRef = useRef(null);

  const onContactPress = contact => {
    setAddress(null);
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
    setAddress(null);
    setAddressInfo(INITIAL_ADDRESS_INFO);
    setSelectedNft(null);
    setSelectedToken(null);
    setSelectedContact(null);
    setUsdAmount(null);
    setTokenAmount(null);
    dispatch(setTransaction(null));
  };

  const partialReset = () => {
    setSelectedNft(null);
  };

  const onChangeText = text => {
    setSelectedContact(null);
    setAddress(text);
  };

  const onReview = () => {
    Keyboard.dismiss();
    reviewRef.current?.open();
  };

  const getTransactionFee = () => {
    let currentFee;

    switch (selectedToken?.symbol) {
      case 'ICP':
        currentFee = DEFAULT_FEE;
        break;
      case 'XTC':
        currentFee = XTC_FEE;
        break;
      default:
        currentFee = 0.0;
        break;
    }

    return currentFee;
  };

  const handleSend = () => {
    setLoading(true);
    const to = address || selectedContact.id;

    if (selectedNft) {
      dispatch(transferNFT({ to, nft: selectedNft }));
    }
    else {
      if (sendingXTCtoCanister && destination === XTC_OPTIONS.BURN) {
        dispatch(burnXtc({ to, amount: tokenAmount }));
      } else {
        dispatch(
          sendToken({
            to,
            amount: tokenAmount,
            canisterId: selectedToken?.canisterId,
          }),
        );
      }
    }
    setTrxComplete(true);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedToken) {
      const price =
        { ICP: icpPrice, XTC: USD_PER_TC, WTC: USD_PER_TC }[
        selectedToken?.symbol
        ] || 1;
      setSelectedTokenPrice(price);
    }
  }, [selectedToken]);

  useEffect(() => {
    if (address || selectedContact) {
      const id = address || selectedContact.id;
      const isUserAddress = [principalId, accountId].includes(id);
      let isValid =
        !isUserAddress && (validatePrincipalId(id) || validateAccountId(id));
      const type = validatePrincipalId(id)
        ? ADDRESS_TYPES.PRINCIPAL
        : ADDRESS_TYPES.ACCOUNT;
      // check for accountId if cycles selected
      if (type === ADDRESS_TYPES.ACCOUNT && selectedToken?.symbol !== 'ICP') {
        isValid = false;
      }
      setAddressInfo({ isValid, type });
      setSendingXTCtoCanister(
        selectedToken?.symbol === 'XTC' && validateCanisterId(id),
      );
    }
  }, [address, selectedContact, selectedToken]);

  const isValidAddress = addressInfo.isValid;

  const availableAmount = Math.max(
    (selectedToken?.amount || 0) - getTransactionFee(),
    0,
  );
  const availableUsdAmount = availableAmount * (selectedTokenPrice || 1);

  return (
    <Modal modalRef={modalRef} onClose={resetState}>
      <Header center={<Text style={FontStyles.Subtitle2}>Send</Text>} />
      <ScrollView style={styles.content} keyboardShouldPersistTaps="always">
        <TextInput
          label="To:"
          placeholder="Name, ICNS, or address"
          variant="innerLabel"
          value={selectedContact ? selectedContact.name : address}
          onChangeText={onChangeText}
          textStyle={isValidAddress ? styles.valid : null}
          autoFocus
        />
        {!isValidAddress && <ContactSection onPress={onContactPress} />}

        {isValidAddress && !selectedToken && (
          <TokenSection
            tokens={assets}
            nfts={nfts}
            onTokenPress={onTokenPress}
            onNftPress={onNftPress}
          />
        )}

        {isValidAddress && selectedToken && (
          <AmountSection
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            tokenPrice={selectedTokenPrice}
            tokenAmount={tokenAmount}
            setTokenAmount={setTokenAmount}
            usdAmount={usdAmount}
            setUsdAmount={setUsdAmount}
            availableAmount={availableAmount}
            availableUsdAmount={availableUsdAmount}
            onReview={onReview}
          />
        )}

        <ReviewSend
          modalRef={reviewRef}
          adjustToContentHeight
          token={selectedToken}
          to={address}
          contact={selectedContact}
          amount={tokenAmount}
          value={usdAmount}
          nft={selectedNft}
          onSend={handleSend}
          onSuccess={() => modalRef.current?.close()}
          onClose={partialReset}
          transaction={transaction}
          loading={loading}
        />
      </ScrollView>
    </Modal>
  );
};

export default Send;
