import { t } from 'i18next';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import RainbowButton from '@/components/buttons/RainbowButton';
import { ActionButton, ActionSheet, Image, Text } from '@/components/common';
import { Option } from '@/components/common/ActionSheet';
import Icon from '@/components/icons';
import { Colors } from '@/constants/theme';
import { Wallet } from '@/interfaces/redux';
import { getICNSData, setReverseResolvedName } from '@/redux/slices/user';
import { ICNS_LOGO } from '@/services/ICNS';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  account: Wallet;
}

function AddICNS({ account, modalRef }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedName, setSelectedName] = useState<string>();
  const [actionSheetOptions, setActionSheetOptions] = useState<Option[]>([]);

  const { names, reverseResolvedName } =
    useSelector(state => state.user?.icnsData) || {};
  // poner un loading de icnsData
  const actionSheetRef = useRef<Modalize>(null);

  useEffect(() => {
    // por ahora uso names pero en realidad aca deberia ir el loading original de icnsData
    if (names?.length) {
      setLoading(false);
    }
  }, [names]);

  const setICNSName = () => {
    dispatch(setReverseResolvedName(selectedName));
  };

  useEffect(() => {
    if (account) {
      dispatch(getICNSData({ wallet: account }));
    }
  }, [account]);

  const handleOnPress = () => {
    const options = names.map((name: string, index: number) => ({
      id: index,
      label: name,
      onPress: () => setSelectedName(name),
      icon: null,
    }));

    setActionSheetOptions(options);
    actionSheetRef?.current?.open();
  };

  return (
    <>
      <Modal adjustToContentHeight modalRef={modalRef}>
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
              onPress={() => modalRef.current?.close()}
            />
          }
        />
        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <View style={styles.container}>
            <Text style={styles.icnsInfo}>
              {t('accounts.icns.info')}
              <Text style={styles.learnMore}>
                {t('accounts.icns.learnMore')}
              </Text>
            </Text>
            <TouchableOpacity onPress={handleOnPress} style={styles.selector}>
              <Text type="subtitle1">{reverseResolvedName || 'None'}</Text>
              <Icon
                name="chevronLeft"
                color={Colors.Gray.Primary}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <RainbowButton
              buttonStyle={styles.buttonStyle}
              text={t('accounts.icns.setICNS')}
              // loading={loading}
              disabled={selectedName === 'None'}
              onPress={setICNSName}
            />
          </View>
        )}
      </Modal>
      <ActionSheet modalRef={actionSheetRef} options={actionSheetOptions} />
    </>
  );
}

export default AddICNS;
