import { t } from 'i18next';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, Linking, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { ActionSheet, Text, TextInput } from '@/components/common';
import Icon from '@/components/icons';
import { Colors } from '@/constants/theme';
import { custonNFTsUrl } from '@/constants/urls';
// import { Error, getError } from './utils';
import { NFTInfo, NonFungibleStandard } from '@/interfaces/keyring';
import { useAppDispatch } from '@/redux/hooks';
import { getNFTInfo } from '@/redux/slices/user';
import { validateCanisterId } from '@/utils/ids';

// import { customTokensUrl } from '@/constants/urls';
import styles, { iconColor } from './styles';

interface Props {
  setSelectedNFT: (nftInfo: NFTInfo) => void;
}

function CustomNFT({ setSelectedNFT }: Props) {
  const dispatch = useAppDispatch();
  const optionsRef = useRef<Modalize>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [nftError, setNftError] = useState<any>(undefined);
  const [canisterId, setCanisterId] = useState<string>('');
  const [canisterIdError, setCanisterIdError] = useState<boolean>(false);
  const [standard, setStandard] = useState<NonFungibleStandard>('DIP721');

  const showCanisterError =
    nftError?.includes('INVALID_CANISTER_ID') ||
    nftError?.includes('EMPTY_IDENTITY_ERROR');

  const handleIdChange = (text: string) => {
    setCanisterId(text);
    setCanisterIdError(!validateCanisterId(text));
    setNftError(undefined);
  };
  const clearValues = () => {
    setLoading(false);
    setCanisterId('');
    setStandard('DIP721');
    setNftError(undefined);
    setCanisterIdError(false);
  };

  const handleStandardChange = useCallback((selected: NonFungibleStandard) => {
    setStandard(selected);
    setNftError(undefined);
  }, []);

  const handleStandardPress = () => {
    Keyboard.dismiss();
    optionsRef?.current?.open();
  };

  const standardList = useMemo(
    () => [
      {
        id: 1,
        label: 'DIP721',
        onPress: () => handleStandardChange('DIP721'),
      },
      // TODO: In the future add more standars here.
    ],
    [handleStandardChange]
  );

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (validateCanisterId(canisterId)) {
      setLoading(true);
      setCanisterIdError(false);
      dispatch(
        getNFTInfo({
          nft: { canisterId, standard },
          onSuccess: res => {
            console.tron.log('nftinfo:', res);
            setSelectedNFT(res);
            clearValues(); // check if this ok
          },
          onError: (err: string) => {
            console.tron.log('err:', err);
            // setTokenError(getError(err));
            setNftError(err);
            setLoading(false);
            // Should I add clearValues() here?
          },
        })
      );
    } else {
      setCanisterIdError(true);
    }
  };

  // const handleLinkPress = () => {
  //   // todo: check for nfts
  //   Linking.canOpenURL(custonNFTsUrl).then(() =>
  //     Linking.openURL(custonNFTsUrl)
  //   );
  // };

  // const renderError = (message: string, showMore: boolean = false) => {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Icon name="error" color={Colors.Red} />
  //       <Text type="caption" style={styles.errorText}>
  //         {`${message} `}
  //         {showMore && (
  //           <Text style={styles.errorLink} onPress={handleLinkPress}>
  //             {t('common.learnMore')}
  //           </Text>
  //         )}
  //       </Text>
  //     </View>
  //   );
  // };

  return (
    // <Modal modalRef={modalRef} adjustToContentHeight onClosed={clearValues}> check onClosed
    // right={<ActionButton label={t('common.close')} onPress={handleClose} />} check handleClose
    <View style={styles.container}>
      <TextInput
        blurOnSubmit
        value={canisterId}
        onBlur={Keyboard.dismiss}
        onChangeText={handleIdChange}
        placeholder={t('addNFT.customNFTId')}
        // error={canisterIdError || showCanisterError}
      />
      {/* {showCanisterError &&
          renderError(tokenError.message, tokenError.showMore)} */}
      <Button
        iconName="chevron"
        onPress={handleStandardPress}
        iconStyle={styles.standardIcon}
        buttonStyle={[
          styles.standardButton,
          // showStandardError && styles.standardButtonError,
        ]}
        textStyle={
          standard ? styles.standardText : styles.standardTextPlaceholder
        }
        text={standard || t('addNFT.customNFTStandard')}
        iconProps={{ height: 18, color: Colors.White.Primary }}
      />
      <View style={styles.captionContainer}>
        <Icon name="info" color={iconColor} />
        <Text type="caption" style={styles.standardCaption}>
          {t('addNFT.customCaption')}
        </Text>
      </View>
      <RainbowButton
        loading={loading}
        onPress={handleSubmit}
        disabled={canisterIdError}
        buttonStyle={styles.button}
        text={t('common.continue')}
      />
      <ActionSheet
        showIcons={false}
        modalRef={optionsRef}
        options={standardList}
        cancelTextStyle={styles.cancelText}
        optionTextStyle={styles.optionsText}
      />
    </View>
  );
}

export default CustomNFT;
