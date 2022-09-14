import { t } from 'i18next';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import RainbowButton from '@/components/buttons/RainbowButton';
import {
  ActionButton,
  ActionSheet,
  Header,
  Image,
  Modal,
  Text,
} from '@/components/common';
import Icon from '@/components/icons';
import { Colors } from '@/constants/theme';
import { ICNS_LEARN_MORE_URL, ICNS_LOGO, ICNS_URL } from '@/constants/urls';
import { getICNSData, setReverseResolvedName } from '@/redux/slices/keyring';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
}

const none = { value: '', id: 'none' };

function AddICNS({ modalRef }: Props) {
  const dispatch = useDispatch();
  const actionSheetRef = useRef<Modalize>(null);
  const { reverseResolvedName, names } = useSelector(
    state => state.keyring.currentWallet?.icnsData
  ) || { names: [] };
  const { icnsDataLoading } = useSelector(state => state.keyring);
  const [selectedName, setSelectedName] = useState<string>(
    reverseResolvedName || none.value
  );
  const noNames = useMemo(() => !names.length, [names]);

  const [reverseResolveLoading, setReverseResolveLoading] =
    useState<boolean>(false);
  const dataLoading = !reverseResolveLoading && icnsDataLoading;

  const setICNSName = useCallback(() => {
    setReverseResolveLoading(true);
    dispatch(
      setReverseResolvedName({
        name: selectedName,
        onFinish: modalRef.current?.close,
      })
    );
  }, [selectedName]);

  useEffect(() => {
    dispatch(getICNSData());
  }, []);

  const actionSheetOptions = useMemo(
    () => [
      ...names.map((name: string) => ({
        id: name,
        label: name,
        onPress: () => setSelectedName(name),
        icon: null,
      })),
      {
        id: none.id,
        label: t('accounts.icns.none'),
        onPress: () => setSelectedName(none.value),
        icon: null,
      },
    ],
    [names]
  );

  const handleOnPress = () => actionSheetRef?.current?.open();

  const clearState = () => {
    setSelectedName(reverseResolvedName || none.value);
    setReverseResolveLoading(false);
  };

  const handleActionMessage = useCallback(() => {
    Linking.openURL(noNames ? ICNS_URL : ICNS_LEARN_MORE_URL);
  }, [noNames]);

  return (
    <>
      <Modal
        HeaderComponent={
          <Header
            center={
              <Image
                url={ICNS_LOGO}
                resizeMode="contain"
                style={styles.icnsLogo}
              />
            }
            right={
              <ActionButton
                label={t('common.close')}
                onPress={() => {
                  modalRef.current?.close();
                  clearState();
                }}
              />
            }
          />
        }
        adjustToContentHeight
        modalRef={modalRef}
        onClose={clearState}>
        {dataLoading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <View style={styles.container}>
            <Text style={[styles.message, !noNames && styles.icnsInfo]}>
              {noNames
                ? t('accounts.icns.emptyState')
                : t('accounts.icns.info')}
              <Text style={styles.actionMessage} onPress={handleActionMessage}>
                {noNames
                  ? t('accounts.icns.buyICNS')
                  : t('accounts.icns.learnMore')}
              </Text>
              {noNames && t('accounts.icns.proceed')}
            </Text>
            {!noNames && (
              <>
                <TouchableOpacity
                  onPress={handleOnPress}
                  style={styles.selector}>
                  <Text type="subtitle1">
                    {selectedName || reverseResolvedName}
                  </Text>
                  <Icon
                    name="chevronLeft"
                    color={Colors.Gray.Primary}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <RainbowButton
                  buttonStyle={styles.buttonStyle}
                  text={t('accounts.icns.setICNS')}
                  onPress={setICNSName}
                  loading={reverseResolveLoading}
                />
              </>
            )}
          </View>
        )}
      </Modal>
      <ActionSheet modalRef={actionSheetRef} options={actionSheetOptions} />
    </>
  );
}

export default AddICNS;
