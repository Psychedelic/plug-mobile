import React, { useEffect, useState, useRef } from 'react';
import { Text, ScrollView, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getAvailableAmount, getUsdAvailableAmount } from './utils';
import { TRANSACTION_STATUS } from '../../redux/constants';
import TextInput from '../../components/common/TextInput';
import { ADDRESS_TYPES } from '../../constants/addresses';
import ContactSection from './components/ContactSection';
import AmountSection from './components/AmountSection';
import TokenSection from './components/TokenSection';
import { getICPPrice } from '../../redux/slices/icp';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import SaveContact from './components/SaveContact';
import ReviewSend from './components/ReviewSend';
import { USD_PER_TC } from '../../utils/assets';
import useKeychain from '../../hooks/useKeychain';
import XTC_OPTIONS from '../../constants/xtc';
import Modal from '../../components/modal';
import {
  burnXtc,
  sendToken,
  setTransaction,
  transferNFT,
} from '../../redux/slices/user';
import styles from './styles';
import {
  validatePrincipalId,
  validateAccountId,
  validateCanisterId,
} from '../../helpers/ids';

const INITIAL_ADDRESS_INFO = { isValid: null, type: null };

const Send = ({ modalRef, nft, onSuccess }) => {
  const dispatch = useDispatch();
  const { isSensorAvailable, getPassword } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { currentWallet } = useSelector(state => state.keyring);
  const { assets, transaction, collections, usingBiometrics } = useSelector(
    state => state.user,
  );

  const reviewRef = useRef(null);
  const saveContactRef = useRef(null);

  const nfts =
    collections?.flatMap(collection => collection?.tokens || []) || [];
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usdAmount, setUsdAmount] = useState(null);
  const [destination] = useState(XTC_OPTIONS.SEND);
  const [selectedNft, setSelectedNft] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(null);
  const [addressInfo, setAddressInfo] = useState(INITIAL_ADDRESS_INFO);
  const [sendingXTCtoCanister, setSendingXTCtoCanister] = useState(false);

  const isValidAddress = addressInfo.isValid;
  const to = address || selectedContact?.id;

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const onContactPress = contact => {
    setAddress(null);
    setSelectedContact(contact);
  };

  const onTokenPress = token => {
    setSelectedToken(token);
  };

  const onNftPress = pressedNFT => {
    setSelectedNft(pressedNFT);
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

  const handleSendNFT = () => {
    dispatch(transferNFT({ to, nft: selectedNft, icpPrice }))
      .unwrap()
      .then(response => {
        if (response.status === TRANSACTION_STATUS.success) {
          setLoading(false);
        }
      });
  };

  const handleSendToken = () => {
    if (sendingXTCtoCanister && destination === XTC_OPTIONS.BURN) {
      dispatch(burnXtc({ to, amount: tokenAmount }));
    } else {
      dispatch(
        sendToken({
          to,
          amount: tokenAmount,
          canisterId: selectedToken?.canisterId,
          icpPrice,
        }),
      )
        .unwrap()
        .then(response => {
          if (response.status) {
            setLoading(false);
          }
        });
    }
  };

  const handleSend = async () => {
    setLoading(true);
    const isBiometricsAvailable = await isSensorAvailable();

    const send = () => {
      if (selectedNft) {
        handleSendNFT();
      } else {
        handleSendToken();
      }
    };

    if (isBiometricsAvailable && usingBiometrics) {
      const biometrics = await getPassword();
      if (biometrics) {
        send();
      }
    } else {
      send();
    }
  };

  useEffect(() => {
    if (nft) {
      setSelectedNft(nft);
    }
    if (selectedNft && (address || selectedContact)) {
      onReview();
    }
  }, [nft, selectedNft, address, selectedContact]);

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
      const isUserAddress = [
        currentWallet?.principal,
        currentWallet?.accountId,
      ].includes(id);
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

  const availableAmount = getAvailableAmount(selectedToken?.amount);
  const availableUsdAmount = getUsdAvailableAmount(
    availableAmount,
    selectedTokenPrice,
  );

  return (
    <Modal modalRef={modalRef} onClose={resetState}>
      <Header center={<Text style={FontStyles.Subtitle2}>Send</Text>} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}
        keyboardShouldPersistTaps="always">
        <TextInput
          label="To:"
          placeholder="Name, ICNS, or address"
          variant="innerLabel"
          value={selectedContact ? selectedContact.name : address}
          onChangeText={onChangeText}
          textStyle={isValidAddress ? styles.valid : null}
          autoFocus
          saveContactRef={
            selectedContact || !address ? undefined : saveContactRef
          }
        />
        {!isValidAddress && (
          <ContactSection filterText={address} onPress={onContactPress} />
        )}
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
          to={selectedContact ? selectedContact?.id : address}
          contact={selectedContact}
          amount={tokenAmount}
          tokenPrice={selectedTokenPrice}
          value={usdAmount}
          nft={selectedNft}
          onSend={handleSend}
          onSuccess={() => {
            modalRef.current?.close();
            onSuccess();
          }}
          onClose={partialReset}
          transaction={transaction}
          loading={loading}
        />
        <SaveContact id={address} modalRef={saveContactRef} />
      </ScrollView>
    </Modal>
  );
};

export default Send;
