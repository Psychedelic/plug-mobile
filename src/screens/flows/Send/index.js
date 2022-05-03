import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Text, ScrollView, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PasswordModal from '@commonComponents/PasswordModal';
import TextInput from '@commonComponents/TextInput';
import { ADDRESS_TYPES } from '@constants/addresses';
import { getICPPrice } from '@redux/slices/icp';
import Header from '@commonComponents/Header';
import { FontStyles } from '@constants/theme';
import useKeychain from '@hooks/useKeychain';
import { USD_PER_TC } from '@utils/assets';
import XTC_OPTIONS from '@constants/xtc';
import Modal from '@components/modal';
import {
  burnXtc,
  sendToken,
  setTransaction,
  transferNFT,
} from '@redux/slices/user';
import {
  validatePrincipalId,
  validateAccountId,
  validateCanisterId,
} from '@utils/ids';

import ContactSection from './components/ContactSection';
import AmountSection from './components/AmountSection';
import TokenSection from './components/TokenSection';
import SaveContact from './components/SaveContact';
import ReviewSend from './components/ReviewSend';
import styles from './styles';
import {
  getAvailableAmount,
  getUsdAvailableAmount,
  formatSendAmount,
  USD_MAX_DECIMALS,
  ICP_MAX_DECIMALS,
} from './utils';

const INITIAL_ADDRESS_INFO = { isValid: null, type: null };

function Send({ modalRef, nft, token, onSuccess }) {
  const dispatch = useDispatch();
  const { isSensorAvailable, getPassword } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { currentWallet } = useSelector(state => state.keyring);
  const {
    assets,
    contacts,
    transaction,
    collections,
    usingBiometrics,
    transactionsLoading,
  } = useSelector(state => state.user);

  const reviewRef = useRef(null);
  const saveContactRef = useRef(null);
  const passwordRef = useRef(null);

  const nfts =
    collections?.flatMap(collection => collection?.tokens || []) || [];
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usdAmount, setUsdAmount] = useState(null);
  const [destination] = useState(XTC_OPTIONS.SEND);
  const [selectedNft, setSelectedNft] = useState(nft);
  const [tokenAmount, setTokenAmount] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(null);
  const [addressInfo, setAddressInfo] = useState(INITIAL_ADDRESS_INFO);
  const [sendingXTCtoCanister, setSendingXTCtoCanister] = useState(false);
  const [biometricsError, setBiometricsError] = useState(false);
  const isValidAddress = addressInfo.isValid;
  const to = address || selectedContact?.id;

  useEffect(() => {
    const savedContact = contacts?.find(c => c.id === address);
    const isMySelf =
      address === currentWallet?.principal ||
      address === currentWallet?.accountId;

    if (savedContact && !isMySelf) {
      setSelectedContact(savedContact);
    }
  }, [contacts, address]);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const handleBiometricsFail = err => {
    if (err.includes('locked')) {
      setBiometricsError(true);
    }
    passwordRef.current?.open();
  };

  const onContactPress = contact => {
    Keyboard.dismiss();
    setAddress(null);
    setSelectedContact(contact);
  };

  const onTokenPress = pressedToken => {
    setSelectedToken(pressedToken);
    setSelectedNft(null);
  };

  const onNftPress = pressedNFT => {
    setSelectedNft(pressedNFT);
    setSelectedToken(null);
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

  const onError = () => {
    resetState();
    modalRef.current?.close();
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
      .then(() => {
        setLoading(false);
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

  const send = () => {
    setLoading(true);
    const handler = selectedNft ? handleSendNFT : handleSendToken;
    handler();
  };

  const validateWithBiometrics = async () => {
    setLoading(true);
    const isBiometricsAvailable = await isSensorAvailable(handleBiometricsFail);
    if (isBiometricsAvailable) {
      const biometricsPassword = await getPassword(handleBiometricsFail);
      setLoading(false);
      return !!biometricsPassword;
    }
    setLoading(false);
    return false;
  };

  const handleSend = async () => {
    let authorized = false;
    if (usingBiometrics) {
      if (biometricsError) {
        // If biometrics has failed, we prompt to enter the password
        passwordRef.current?.open();
      } else {
        authorized = await validateWithBiometrics();
        if (authorized) {
          send();
        }
      }
    } else {
      send();
    }
  };

  useEffect(() => {
    if (!selectedToken && nft) {
      setSelectedNft(nft);
    }
  }, [nft, isValidAddress]);

  useEffect(() => {
    if (!selectedNft && token) {
      setSelectedToken(token);
    }
  }, [token, isValidAddress]);

  useEffect(() => {
    if (selectedNft && (isValidAddress || selectedContact)) {
      onReview();
    }
  }, [selectedNft, isValidAddress, selectedContact]);

  useEffect(() => {
    if (selectedToken) {
      const price =
        { ICP: icpPrice, XTC: USD_PER_TC, WTC: USD_PER_TC, WICP: icpPrice }[
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

  const availableAmount = useMemo(
    () =>
      formatSendAmount(
        getAvailableAmount(
          selectedToken?.amount,
          selectedToken?.symbol,
          icpPrice,
        ),
        ICP_MAX_DECIMALS,
      ),
    [selectedToken],
  );
  const availableUsdAmount = useMemo(
    () =>
      formatSendAmount(
        getUsdAvailableAmount(availableAmount, selectedTokenPrice),
        USD_MAX_DECIMALS,
      ),
    [availableAmount, selectedTokenPrice],
  );

  const getSaveContactRef = () => {
    if (selectedContact || !isValidAddress) {
      return null;
    } else {
      return saveContactRef;
    }
  };

  const handleBack = () => {
    setAddress(null);
    setSelectedContact(null);
    setAddressInfo(INITIAL_ADDRESS_INFO);
  };

  return (
    <Modal
      modalRef={modalRef}
      onClose={resetState}
      scrollViewProps={{ keyboardShouldPersistTaps: 'never' }}>
      <ScrollView
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <Header
          left={
            isValidAddress && (
              <Text
                style={[FontStyles.Normal, styles.valid]}
                onPress={handleBack}>
                Back
              </Text>
            )
          }
          center={<Text style={FontStyles.Subtitle2}>Send</Text>}
        />
        <TextInput
          label="To:"
          placeholder="Name or address"
          variant="innerLabel"
          hideGradient
          value={selectedContact ? selectedContact.name : address}
          onChangeText={onChangeText}
          textStyle={isValidAddress ? styles.valid : null}
          autoFocus
          saveContactRef={getSaveContactRef()}
        />
        {!isValidAddress && (
          <ContactSection filterText={address} onPress={onContactPress} />
        )}
        {isValidAddress && !selectedToken && (
          <TokenSection
            nfts={nfts}
            tokens={assets}
            onNftPress={onNftPress}
            onTokenPress={onTokenPress}
          />
        )}
        {isValidAddress && selectedToken && (
          <AmountSection
            selectedToken={selectedToken}
            tokenPrice={selectedTokenPrice}
            setSelectedToken={setSelectedToken}
            tokenAmount={tokenAmount}
            setTokenAmount={setTokenAmount}
            usdAmount={usdAmount}
            setUsdAmount={setUsdAmount}
            availableAmount={availableAmount}
            availableUsdAmount={availableUsdAmount}
            onReview={onReview}
          />
        )}
      </ScrollView>
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
        onError={onError}
        onSuccess={() => {
          modalRef.current?.close();
          if (onSuccess) {
            onSuccess();
          }
        }}
        onClose={partialReset}
        transaction={transaction}
        loading={loading || transactionsLoading}
      />
      <SaveContact id={address} modalRef={saveContactRef} />
      <PasswordModal modalRef={passwordRef} handleSubmit={send} />
    </Modal>
  );
}

export default Send;
