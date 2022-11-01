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
import { CollectionInfo, NonFungibleStandard } from '@/interfaces/keyring';
import { useAppDispatch } from '@/redux/hooks';
import { getCollectionInfo } from '@/redux/slices/user';
import { validateCanisterId } from '@/utils/ids';

import styles, { iconColor } from './styles';
interface Props {
  setSelectedCollection: (collectionInfo: CollectionInfo) => void;
}

function CustomCollection({ setSelectedCollection }: Props) {
  const dispatch = useAppDispatch();
  const optionsRef = useRef<Modalize>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [collectionError, setCollectionError] = useState<boolean>(false);
  const [canisterId, setCanisterId] = useState<string>('');
  const [canisterIdError, setCanisterIdError] = useState<boolean>(false);
  const [standard, setStandard] = useState<NonFungibleStandard>('DIP721');

  const error = canisterIdError || collectionError;

  const handleIdChange = (text: string) => {
    setCanisterId(text);
    setCanisterIdError(!validateCanisterId(text));
    setCollectionError(false);
  };

  const clearValues = () => {
    setLoading(false);
    setCanisterId('');
    setStandard('DIP721');
    setCollectionError(false);
    setCanisterIdError(false);
  };

  const handleStandardChange = useCallback((selected: NonFungibleStandard) => {
    setStandard(selected);
    setCollectionError(false);
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
    ],
    [handleStandardChange]
  );

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (validateCanisterId(canisterId)) {
      setLoading(true);
      setCanisterIdError(false);
      dispatch(
        getCollectionInfo({
          collection: { canisterId, standard },
          onSuccess: collection => {
            setSelectedCollection(collection);
            clearValues();
          },
          onFailure: () => {
            setCollectionError(true);
            setLoading(false);
          },
        })
      );
    } else {
      setCanisterIdError(true);
    }
  };

  const handleLinkPress = () => {
    Linking.canOpenURL(custonNFTsUrl).then(() =>
      Linking.openURL(custonNFTsUrl)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        blurOnSubmit
        value={canisterId}
        onBlur={Keyboard.dismiss}
        onChangeText={handleIdChange}
        placeholder={t('addCollection.customCollectionId')}
        error={error}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="error" color={Colors.Red} />
          <Text type="caption" style={styles.errorText}>
            {collectionError
              ? t('addCollection.canisterNotCompatible', { standard })
              : t('addCollection.invalidCanisterId')}
            {canisterIdError && (
              <Text style={styles.errorLink} onPress={handleLinkPress}>
                {t('common.learnMore')}
              </Text>
            )}
          </Text>
        </View>
      )}
      <Button
        iconName="chevron"
        onPress={handleStandardPress}
        iconStyle={styles.standardIcon}
        buttonStyle={styles.standardButton}
        textStyle={
          standard ? styles.standardText : styles.standardTextPlaceholder
        }
        text={standard || t('addCollection.customCollectionStandard')}
        iconProps={{ height: 18, color: Colors.White.Primary }}
      />
      <View style={styles.captionContainer}>
        <Icon name="info" color={iconColor} />
        <Text type="caption" style={styles.standardCaption}>
          {t('addCollection.customCaption')}
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

export default CustomCollection;
