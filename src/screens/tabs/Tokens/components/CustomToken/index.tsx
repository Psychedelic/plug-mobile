import { t } from 'i18next';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, Linking, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch } from 'react-redux';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import ActionButton from '@/components/common/ActionButton';
import ActionSheet from '@/components/common/ActionSheet';
import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import TextInput from '@/components/common/TextInput';
import ErrorIcon from '@/components/icons/svg/Error.svg';
import Info from '@/components/icons/svg/Info.svg';
import { customTokensUrl } from '@/constants/urls';
import { DABToken } from '@/interfaces/dab';
import { FungibleStandard } from '@/interfaces/keyring';
import { getTokenInfo } from '@/redux/slices/user';
import { validateCanisterId } from '@/utils/ids';

import styles, { iconColor } from './styles';
import { Error, getError } from './utils';

interface Props {
  modalRef: React.RefObject<Modalize>;
  onSelectedToken: (token: DABToken) => void;
}

function CustomToken({ modalRef, onSelectedToken }: Props) {
  const [canisterId, setCanisterId] = useState('');
  const dispatch = useDispatch();
  const [standard, setStandard] = useState<FungibleStandard>('DIP20');
  const [loading, setLoading] = useState(false);
  const [canisterIdError, setCanisterIdError] = useState(false);
  const [tokenError, setTokenError] = useState<Error>();
  const optionsRef = useRef<Modalize>(null);
  const showCanisterError =
    tokenError?.type === 'INVALID_CANISTER_ID' ||
    tokenError?.type === 'INVALID_NFT';
  const showStandardError =
    tokenError?.type === 'INVALID_STANTARD' || tokenError?.type === 'DEFAULT';

  function renderError(message: string, showMore: boolean = false) {
    return (
      <View style={styles.errorContainer}>
        <ErrorIcon fill="red" />
        <Text type="caption" style={styles.errorText}>
          {`${message} `}
          {showMore && (
            <Text style={styles.errorLink} onPress={handleLinkPress}>
              {t('addToken.learnMore')}
            </Text>
          )}
        </Text>
      </View>
    );
  }

  const clearValues = () => {
    setCanisterId('');
    setStandard('DIP20');
    setLoading(false);
    setTokenError(undefined);
    setCanisterIdError(false);
  };

  const handleClose = () => {
    modalRef?.current?.close();
    clearValues();
  };

  const handleIdChange = (text: string) => {
    setCanisterId(text);
    setCanisterIdError(!validateCanisterId(text));
    setTokenError(undefined);
  };

  const handleStandardChange = useCallback((selected: FungibleStandard) => {
    setStandard(selected);
    setTokenError(undefined);
  }, []);

  const handleStandardPress = () => {
    Keyboard.dismiss();
    optionsRef?.current?.open();
  };

  const handleLinkPress = () => {
    Linking.canOpenURL(customTokensUrl).then(() =>
      Linking.openURL(customTokensUrl)
    );
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (validateCanisterId(canisterId)) {
      setLoading(true);
      setCanisterIdError(false);
      dispatch(
        getTokenInfo({
          token: { canisterId, standard },
          onSuccess: res => {
            onSelectedToken(res.token);
            setLoading(false);
          },
          onError: (err: string) => {
            setTokenError(getError(err));
            setLoading(false);
          },
        })
      );
    } else {
      setCanisterIdError(true);
    }
  };

  const standardList = useMemo(
    () => [
      {
        id: 1,
        label: 'DIP20',
        onPress: () => handleStandardChange('DIP20'),
      },
      {
        id: 2,
        label: 'EXT',
        onPress: () => handleStandardChange('EXT'),
      },
    ],
    [handleStandardChange]
  );

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClosed={clearValues}>
      <Header
        center={
          <Text style={styles.title} type="subtitle3">
            {t('addToken.customTokenTitle')}
          </Text>
        }
        right={<ActionButton label={t('common.close')} onPress={handleClose} />}
      />
      <View style={styles.container}>
        <TextInput
          placeholder={t('addToken.customTokenId')}
          value={canisterId}
          onChangeText={handleIdChange}
          blurOnSubmit
          onBlur={Keyboard.dismiss}
          error={canisterIdError || showCanisterError}
        />
        {showCanisterError &&
          renderError(tokenError.message, tokenError.showMore)}
        <Button
          text={standard || t('addToken.customTokenStandard')}
          onPress={handleStandardPress}
          buttonStyle={[
            styles.standardButton,
            showStandardError && styles.standardButtonError,
          ]}
          textStyle={
            standard ? styles.standardText : styles.standardTextPlaceholder
          }
          iconStyle={styles.standardIcon}
          iconName="chevronRight" // TODO: Modify button to receive the icon as prop
        />
        {showStandardError ? (
          renderError(tokenError.message, tokenError.showMore)
        ) : (
          <View style={styles.captionContainer}>
            <Info fill={iconColor} />
            <Text type="caption" style={styles.standardCaption}>
              {t('addToken.customCaption')}
            </Text>
          </View>
        )}
        <RainbowButton
          text={t('common.continue')}
          buttonStyle={styles.button}
          onPress={handleSubmit}
          loading={loading}
          disabled={canisterIdError}
        />
        <ActionSheet
          modalRef={optionsRef}
          showIcons={false}
          options={standardList}
        />
      </View>
    </Modal>
  );
}

export default CustomToken;
