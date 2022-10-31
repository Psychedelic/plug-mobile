import { t } from 'i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import { PasswordModal, Text, TextInput, Touchable } from '@/components/common';
import Icon from '@/components/icons';
import { ADDRESS_TYPES } from '@/constants/addresses';
import { TOKENS, USD_PER_TC } from '@/constants/assets';
import XTC_OPTIONS from '@/constants/xtc';
import useICNS from '@/hooks/useICNS';
import useKeychain from '@/hooks/useKeychain';
import { ScreenProps } from '@/interfaces/navigation';
import { Asset, CollectionToken, Contact } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getICPPrice } from '@/redux/slices/icp';
import { burnXtc, sendToken, transferNFT } from '@/redux/slices/user';
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
import { Amount } from './interfaces';
import styles from './styles';

//Check this. Can we unify address of contact, written and icns?
const INITIAL_ADDRESS_INFO: {
  isValid?: boolean;
  type?: string;
  resolvedAddress?: string;
} = {
  isValid: undefined,
  type: undefined,
  resolvedAddress: undefined,
};

function Send({ route }: ScreenProps<Routes.SEND>) {
  const dispatch = useAppDispatch();
  const { token, nft } = route?.params || {};
  const { isSensorAvailable, getPassword } = useKeychain();
  const { icpPrice } = useAppSelector(state => state.icp);
  const { currentWallet } = useAppSelector(state => state.keyring);
  const { assets, contacts, transaction, collections, usingBiometrics } =
    useAppSelector(state => state.user);

  const reviewRef = useRef<Modalize>(null);
  const saveContactRef = useRef<Modalize>(null);
  const passwordRef = useRef<Modalize>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const nfts = useMemo(
    () => (collections ? formatCollections(collections) : []),
    [collections]
  );
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [destination] = useState(XTC_OPTIONS.SEND);
  const [selectedNft, setSelectedNft] = useState<CollectionToken | undefined>(
    nft
  );

  const [tokenAmount, setTokenAmount] = useState<Amount>();
  const [usdAmount, setUsdAmount] = useState<Amount>();
  const [selectedToken, setSelectedToken] = useState<Asset | undefined>(token);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [selectedTokenPrice, setSelectedTokenPrice] = useState<number>();
  const [addressInfo, setAddressInfo] = useState(INITIAL_ADDRESS_INFO);
  const [sendingXTCtoCanister, setSendingXTCtoCanister] = useState(false);
  const [biometricsError, setBiometricsError] = useState(false);

  const isValidAddress = addressInfo.isValid;
  const showContacts = !addressInfo.isValid;
  const showTokens = addressInfo.isValid && !selectedToken;
  const showAmountSelector = addressInfo.isValid && selectedToken;
  const to = addressInfo.resolvedAddress || address || selectedContact?.id;

  const {
    loading: loadingICNS,
    resolvedAddress,
    isValid: isValidICNS,
  } = useICNS(address || selectedContact?.id, selectedToken?.symbol);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  };

  const handleBiometricsFail = (err: string) => {
    if (err.includes('locked')) {
      setBiometricsError(true);
    }
    passwordRef.current?.open();
  };

  const onContactPress = (contact: Contact) => {
    Keyboard.dismiss();
    setAddress(undefined);
    setSelectedContact(contact);
    scrollToTop();
  };

  const onTokenPress = (pressedToken: Asset) => {
    setSelectedToken(pressedToken);
    setSelectedNft(undefined);
    scrollToTop();
  };

  const onNftPress = (pressedNFT: CollectionToken) => {
    setSelectedNft(pressedNFT);
    setSelectedToken(undefined);
    onReview();
  };

  // const resetState = () => {
  //   setAddress(null);
  //   setAddressInfo(INITIAL_ADDRESS_INFO);
  //   setSelectedNft(null);
  //   setSelectedToken(null);
  //   setSelectedContact(null);
  //   setUsdAmount(null);
  //   setTokenAmount(null);
  //   dispatch(setTransaction(null)); => CHECK THIS ONE
  // };

  // const onError = () => {
  //   resetState();
  //   modalRef.current?.close();
  // };

  const onChangeText = (text: string) => {
    setAddress(text);
    const savedContact = contacts?.find(c => c.id === text);
    const isMySelf =
      text === currentWallet?.principal || text === currentWallet?.accountId;

    if (savedContact && !isMySelf) {
      setSelectedContact(savedContact);
      setAddress(undefined);
      scrollToTop();
    } else if (selectedContact) {
      setSelectedContact(undefined);
    }
  };

  const onReview = () => {
    Keyboard.dismiss();
    reviewRef.current?.open();
  };

  const handleSendNFT = () => {
    if (selectedNft && to) {
      setLoading(true);
      dispatch(
        transferNFT({
          to,
          nft: selectedNft,
          icpPrice,
          onEnd: () => setLoading(false),
        })
      );
    }
  };

  const handleSendToken = () => {
    if (tokenAmount && to && selectedToken) {
      setLoading(true);
      const amount = tokenAmount.value;
      if (sendingXTCtoCanister && destination === XTC_OPTIONS.BURN) {
        dispatch(
          burnXtc({
            to,
            amount: amount.toString(),
            onEnd: () => setLoading(false),
          })
        );
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
            onEnd: () => setLoading(false),
          })
        );
      }
    }
  };

  const send = () => {
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
    if (selectedNft && (isValidAddress || selectedContact)) {
      onReview();
    }
  }, [selectedNft, isValidAddress, selectedContact]);

  useEffect(() => {
    if (selectedToken) {
      const price =
        { ICP: icpPrice, XTC: USD_PER_TC, WTC: USD_PER_TC, WICP: icpPrice }[
          selectedToken?.symbol
        ] || undefined;
      setSelectedTokenPrice(price);
    }
  }, [selectedToken]);

  useEffect(() => {
    if (address || selectedContact) {
      const id = resolvedAddress || address || selectedContact?.id;
      if (id) {
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
    }
  }, [address, selectedContact, selectedToken, isValidICNS, resolvedAddress]);

  const availableAmount = useMemo(
    () => (selectedToken ? selectedToken?.amount - selectedToken?.fee : 0),
    [selectedToken]
  );

  const availableUsdAmount = useMemo(
    () =>
      selectedTokenPrice ? availableAmount * selectedTokenPrice : undefined,
    [availableAmount, selectedTokenPrice]
  );

  const tokens = useMemo(
    () =>
      addressInfo?.type === ADDRESS_TYPES.ACCOUNT
        ? assets.filter(asset => asset.symbol === TOKENS.ICP.symbol)
        : assets,
    [assets, addressInfo]
  );

  return (
    <>
      <TextInput
        placeholder={t('send.inputPlaceholder')}
        hideGradient
        value={selectedContact ? selectedContact.name : address}
        onChangeText={onChangeText}
        inputStyle={[styles.inputText, isValidAddress && styles.inputTextValid]}
        style={styles.input}
        contentContainerStyle={styles.inputContent}
        left={<Text style={styles.inputLeftLabel}>{t('send.inputLabel')}</Text>}
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
      <ScrollView ref={scrollViewRef} style={styles.contentContainer}>
        {showContacts && (
          <ContactSection
            filterText={address}
            onPress={onContactPress}
            showAccountIdContacts={
              !selectedToken?.symbol ||
              selectedToken.symbol === TOKENS.ICP.symbol
            }
          />
        )}
        {showTokens && (
          <TokenSection
            nfts={nfts}
            tokens={tokens}
            onNftPress={onNftPress}
            onTokenPress={onTokenPress}
          />
        )}
        {showAmountSelector && (
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
        value={usdAmount}
        nft={selectedNft}
        onSend={handleSend}
        onClose={() => setSelectedNft(undefined)}
        transaction={transaction}
        loading={loading || loadingICNS}
      />
      {address && <SaveContact id={address} modalRef={saveContactRef} />}
      <PasswordModal
        modalRef={passwordRef}
        handleSubmit={send}
        title={t('send.enterPassword')}
      />
    </>
  );
}

export default Send;
