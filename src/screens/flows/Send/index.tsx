import { t } from 'i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import { PasswordModal, Text, TextInput, Touchable } from '@/components/common';
import Icon from '@/components/icons';
import { TOKENS, USD_PER_TC } from '@/constants/assets';
import useICNS from '@/hooks/useICNS';
import useKeychain from '@/hooks/useKeychain';
import { ModalScreenProps } from '@/interfaces/navigation';
import { Asset, Contact } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getICPPrice } from '@/redux/slices/icp';
import { sendToken, setTransaction, transferNFT } from '@/redux/slices/user';
import { formatCollections, FormattedCollection } from '@/utils/assets';
import {
  validateAccountId,
  validateICNSName,
  validatePrincipalId,
} from '@/utils/ids';

import AmountSection from './components/AmountSection';
import ContactSection from './components/ContactSection';
import ReviewSend from './components/ReviewSend';
import SaveContact from './components/SaveContact';
import TokenSection from './components/TokenSection';
import { Amount } from './interfaces';
import styles from './styles';

export interface Receiver {
  id: string; // PID or AccID address
  name?: string;
  image?: string;
  icnsId?: string;
  isValid?: boolean;
}

function Send({ route }: ModalScreenProps<Routes.SEND>) {
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

  const formattedNFT = useMemo(() => {
    if (!nft) {
      return undefined;
    }
    return nfts.find(n => n.canister === nft.canister && n.index === nft.index);
  }, [nfts]);
  const [loading, setLoading] = useState(false);
  const [selectedNft, setSelectedNft] = useState<
    FormattedCollection | undefined
  >(formattedNFT);

  const [tokenAmount, setTokenAmount] = useState<Amount>();
  const [usdAmount, setUsdAmount] = useState<Amount>();
  const [selectedToken, setSelectedToken] = useState<Asset | undefined>(token);
  const [selectedTokenPrice, setSelectedTokenPrice] = useState<number>();
  const [biometricsError, setBiometricsError] = useState(false);
  const [receiver, setReceiver] = useState<Receiver>();

  const isValidAddress = receiver?.isValid;
  const showContacts = !receiver?.isValid;
  const showTokens = receiver?.isValid && !selectedToken;
  const showAmountSelector = receiver?.isValid && selectedToken;
  const isNewContact =
    receiver?.isValid &&
    !contacts?.find(contact =>
      receiver?.icnsId
        ? contact.id === receiver?.icnsId
        : contact.id === receiver?.id
    );

  const availableAmount = selectedToken
    ? selectedToken?.amount - selectedToken?.fee
    : 0;

  const availableUsdAmount = selectedTokenPrice
    ? availableAmount * selectedTokenPrice
    : undefined;

  const tokens = useMemo(
    () =>
      receiver?.id && validateAccountId(receiver.id)
        ? assets.filter(asset => asset.symbol === TOKENS.ICP.symbol) // Use only ICP if receiver is an account
        : assets,
    [assets, receiver]
  );

  const {
    loading: loadingICNS,
    address: resolvedName,
    resolvedAddress,
    isValid: isValidICNS,
  } = useICNS(
    receiver?.icnsId ? undefined : receiver?.id,
    selectedToken?.symbol
  );

  useEffect(() => {
    dispatch(getICPPrice());
    return () => {
      dispatch(setTransaction(null));
    };
  }, []);

  useEffect(() => {
    if (selectedNft && receiver?.isValid) {
      onReview();
    }
  }, [selectedNft, isValidAddress, receiver]);

  useEffect(() => {
    if (selectedToken) {
      const price =
        { ICP: icpPrice, XTC: USD_PER_TC, WTC: USD_PER_TC, WICP: icpPrice }[
          selectedToken?.symbol
        ] || undefined;
      setSelectedTokenPrice(price);
    }
  }, [selectedToken, icpPrice]);

  /** Checks if the ICNS hook returns valid info and updates the receiver state */
  useEffect(() => {
    if (
      isValidICNS &&
      resolvedName &&
      validateICNSName(resolvedName) &&
      currentWallet?.icnsData?.reverseResolvedName !== resolvedName
    ) {
      const savedContact = contacts?.find(c => c.id === resolvedName);
      setReceiver({
        id: resolvedAddress!,
        name: savedContact?.name || resolvedName,
        image: savedContact?.image,
        icnsId: resolvedName,
        isValid: true,
      });
    }
  }, [isValidICNS, resolvedAddress, resolvedName, contacts]);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  };

  const handleBiometricsFail = (err: string) => {
    if (err.includes('locked')) {
      setBiometricsError(true);
    }
    passwordRef.current?.open();
  };

  const handleContactPress = (contact: Contact) => {
    Keyboard.dismiss();
    setReceiver({
      ...contact,
      isValid: true,
    });
    scrollToTop();
  };

  const handleTokenPress = (pressedToken: Asset) => {
    setSelectedToken(pressedToken);
    setSelectedNft(undefined);
    scrollToTop();
  };

  const handleNftPress = (pressedNFT: FormattedCollection) => {
    setSelectedNft(pressedNFT);
    setSelectedToken(undefined);
    onReview();
  };

  const onChangeText = (text: string) => {
    if (!text) {
      return setReceiver(undefined);
    }

    const savedContact = contacts?.find(c => c.id === text);
    const isOwnAddress =
      text === currentWallet?.principal ||
      text === currentWallet?.accountId ||
      text === currentWallet?.icnsData?.reverseResolvedName;

    if (savedContact && !isOwnAddress) {
      setReceiver({
        ...savedContact,
        isValid: true,
      });
      scrollToTop();
    } else {
      const isValid =
        !isOwnAddress && (validatePrincipalId(text) || validateAccountId(text));
      setReceiver({ id: text, isValid });
    }
  };

  const onReview = () => {
    Keyboard.dismiss();
    reviewRef.current?.open();
  };

  const handleSendNFT = () => {
    if (selectedNft && receiver?.id) {
      setLoading(true);
      dispatch(
        transferNFT({
          to: receiver.id,
          nft: selectedNft,
          icpPrice,
          onSuccess: () => setLoading(false),
          onFailure: () => setLoading(false),
        })
      );
    }
  };

  const handleSendToken = () => {
    if (tokenAmount && receiver?.id && selectedToken) {
      setLoading(true);
      const amount = tokenAmount.value;
      dispatch(
        sendToken({
          to: receiver.id,
          amount,
          canisterId: selectedToken?.canisterId,
          icpPrice,
          opts: {
            fee:
              selectedToken?.fee && selectedToken?.decimals
                ? selectedToken.fee * Math.pow(10, selectedToken.decimals)
                : 0, // TODO: Change this to selectedToken.fee only when dab is ready
          },
          onSuccess: () => setLoading(false),
          onFailure: () => setLoading(false),
        })
      );
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

  const handleContactSaved = ({ id, name, image }: Contact) => {
    setReceiver({
      id: validateICNSName(id) && receiver?.id ? receiver.id : id, // If the contact is an ICNS, we keep the previous resolved address
      name,
      image,
      icnsId: receiver?.icnsId,
      isValid: true,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t('send.inputPlaceholder')}
        hideGradient
        value={receiver?.name || receiver?.id}
        onChangeText={onChangeText}
        inputStyle={[styles.inputText, isValidAddress && styles.inputTextValid]}
        style={styles.input}
        contentContainerStyle={styles.inputContent}
        left={<Text style={styles.inputLeftLabel}>{t('send.inputLabel')}</Text>}
        right={
          isNewContact ? (
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
            filterText={receiver?.id}
            onPress={handleContactPress}
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
            onNftPress={handleNftPress}
            onTokenPress={handleTokenPress}
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
            disabledButton={loading || loadingICNS}
          />
        )}
      </ScrollView>
      <ReviewSend
        modalRef={reviewRef}
        adjustToContentHeight
        token={selectedToken}
        contact={receiver}
        isNewContact={isNewContact}
        amount={tokenAmount}
        value={usdAmount}
        nft={selectedNft}
        onSend={handleSend}
        onClose={() => setSelectedNft(undefined)}
        onContactSaved={handleContactSaved}
        transaction={transaction}
        loading={loading}
        disabled={loadingICNS}
      />
      {isNewContact && receiver && (
        <SaveContact
          id={receiver?.icnsId || receiver.id}
          modalRef={saveContactRef}
          onSaved={handleContactSaved}
        />
      )}
      <PasswordModal
        modalRef={passwordRef}
        handleSubmit={send}
        title={t('send.enterPassword')}
      />
    </View>
  );
}

export default Send;
