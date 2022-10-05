import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/commonComponents/Header';
import Modal, { modalOffset } from '@/commonComponents/Modal';
import PasswordModal from '@/commonComponents/PasswordModal';
import TextInput from '@/commonComponents/TextInput';
import ActionButton from '@/components/common/ActionButton';
import Text from '@/components/common/Text';
import Touchable from '@/components/common/Touchable';
import Icon from '@/components/icons';
import { ADDRESS_TYPES } from '@/constants/addresses';
import { TOKENS, USD_PER_TC } from '@/constants/assets';
import { isAndroid } from '@/constants/platform';
import XTC_OPTIONS from '@/constants/xtc';
import useICNS from '@/hooks/useICNS';
import useKeychain from '@/hooks/useKeychain';
import { getICPPrice } from '@/redux/slices/icp';
import {
  burnXtc,
  sendToken,
  setTransaction,
  transferNFT,
} from '@/redux/slices/user';
import { formatCollections } from '@/utils/assets';
import {
  validateAccountId,
  validateCanisterId,
  validatePrincipalId,
} from '@/utils/ids';

import AmountSection from './components/AmountSection';
import ContactSection from './components/ContactSection';
import ReviewSend from './components/ReviewSend';
import SaveContact from './components/SaveContact';
import TokenSection from './components/TokenSection';
import styles from './styles';

const INITIAL_ADDRESS_INFO = {
  isValid: null,
  type: null,
  resolvedAddress: null,
};

function Send({ modalRef, nft, token, onSuccess }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isSensorAvailable, getPassword } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { currentWallet } = useSelector(state => state.keyring);
  const { assets, contacts, transaction, collections, usingBiometrics } =
    useSelector(state => state.user);

  const reviewRef = useRef(null);
  const saveContactRef = useRef(null);
  const passwordRef = useRef(null);

  const nfts = useMemo(
    () => (collections ? formatCollections(collections) : []),
    [collections]
  );
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
  const to = addressInfo.resolvedAddress || address || selectedContact?.id;

  const {
    loading: loadingICNS,
    resolvedAddress,
    isValid: isValidICNS,
  } = useICNS(address || selectedContact?.id, selectedToken?.symbol);

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
    dispatch(
      transferNFT({
        to,
        nft: selectedNft,
        icpPrice,
        onEnd: () => setLoading(false),
      })
    );
  };

  const handleSendToken = () => {
    const amount = tokenAmount.value;
    if (sendingXTCtoCanister && destination === XTC_OPTIONS.BURN) {
      dispatch(burnXtc({ to, amount: amount.toString() }));
    } else {
      dispatch(
        sendToken({
          to,
          amount,
          canisterId: selectedToken?.canisterId,
          icpPrice,
          opts: {
            fee:
              selectedToken?.fee && selectedToken?.decimals
                ? selectedToken.fee * Math.pow(10, selectedToken.decimals)
                : 0, // TODO: Change this to selectedToken.fee only when dab is ready
          },
        })
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
        ] || null;
      setSelectedTokenPrice(price);
    }
  }, [selectedToken]);

  useEffect(() => {
    if (address || selectedContact) {
      const id = resolvedAddress || address || selectedContact.id;
      const isUserAddress = [
        currentWallet?.principal,
        currentWallet?.accountId,
      ].includes(id);
      let isValid =
        !isUserAddress &&
        (validatePrincipalId(id) || validateAccountId(id) || isValidICNS);

      const type = validatePrincipalId(id)
        ? ADDRESS_TYPES.PRINCIPAL
        : ADDRESS_TYPES.ACCOUNT;
      if (
        type === ADDRESS_TYPES.ACCOUNT &&
        selectedToken?.symbol &&
        selectedToken.symbol !== TOKENS.ICP.symbol
      ) {
        isValid = false;
      }
      setAddressInfo({ isValid, type, resolvedAddress });
      setSendingXTCtoCanister(
        selectedToken?.symbol === TOKENS.XTC.symbol && validateCanisterId(id)
      );
    }
  }, [address, selectedContact, selectedToken, isValidICNS, resolvedAddress]);

  const availableAmount = useMemo(
    () => selectedToken?.amount - selectedToken?.fee,
    [selectedToken]
  );

  const availableUsdAmount = useMemo(
    () => (selectedTokenPrice ? availableAmount * selectedTokenPrice : null),
    [availableAmount, selectedTokenPrice]
  );

  const handleBack = () => {
    setAddress(null);
    setSelectedContact(null);
    setAddressInfo(INITIAL_ADDRESS_INFO);
  };

  const tokens = useMemo(
    // TODO: Add OGY when is available on Mobile.
    () =>
      addressInfo?.type === ADDRESS_TYPES.ACCOUNT
        ? assets.filter(asset => asset.symbol === TOKENS.ICP.symbol)
        : assets,
    [assets, addressInfo]
  );

  return (
    <Modal
      modalRef={modalRef}
      onClose={resetState}
      fullHeight
      modalStyle={
        isAndroid &&
        modalOffset && {
          marginTop: modalOffset,
          minHeight: '100%',
        }
      }
      scrollViewProps={{
        keyboardShouldPersistTaps: 'never',
      }}
      HeaderComponent={
        <>
          <Header
            left={
              isValidAddress && (
                <ActionButton onPress={handleBack} label={t('common.back')} />
              )
            }
            center={<Text style={styles.centerText}>{t('send.title')}</Text>}
          />
          <TextInput
            placeholder={t('send.inputPlaceholder')}
            hideGradient
            value={selectedContact ? selectedContact.name : address}
            onChangeText={onChangeText}
            inputStyle={[
              styles.inputText,
              isValidAddress && styles.inputTextValid,
            ]}
            autoFocus
            style={styles.input}
            contentContainerStyle={styles.inputContent}
            left={
              <Text style={styles.inputLeftLabel}>{t('send.inputLabel')}</Text>
            }
            right={
              !selectedContact && isValidAddress ? (
                <Touchable
                  style={styles.addIcon}
                  onPress={saveContactRef?.current?.open}>
                  <Icon name="plus" />
                </Touchable>
              ) : loadingICNS ? (
                <ActivityIndicator color="white" />
              ) : null
            }
          />
        </>
      }>
      <View
        style={[
          styles.contentContainer,
          isAndroid &&
            modalOffset && {
              paddingBottom: modalOffset,
            },
        ]}>
        {!isValidAddress && (
          <ContactSection
            filterText={address}
            onPress={onContactPress}
            selectedTokenSymbol={selectedToken?.symbol}
          />
        )}
        {isValidAddress && !selectedToken && (
          <TokenSection
            nfts={nfts}
            tokens={tokens}
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
      </View>
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
          onSuccess?.();
        }}
        onClose={partialReset}
        transaction={transaction}
        loading={loading || loadingICNS}
      />
      <SaveContact id={address} modalRef={saveContactRef} />
      <PasswordModal
        modalRef={passwordRef}
        handleSubmit={send}
        title={t('send.enterPassword')}
      />
    </Modal>
  );
}

export default Send;
