import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import NftDisplayer from '@/commonComponents/NftDisplayer';
import UserIcon from '@/commonComponents/UserIcon';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import TokenIcon from '@/components/tokens/TokenIcon';
import { Colors, FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';
import { Column } from '@/layout';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { setTransaction } from '@/redux/slices/user';
import { TRANSACTION_STATUS } from '@/redux/utils';
import shortAddress from '@/utils/shortAddress';

import SaveContact from '../SaveContact';
import styles from './styles';

const ReviewSend = ({
  modalRef,
  onError,
  token,
  nft,
  amount,
  value,
  to,
  contact,
  onSend,
  onClose,
  onSuccess,
  transaction,
  tokenPrice,
  loading,
  biometricsError,
  setBiometricsError,
  ...props
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const saveContactRef = useRef(null);
  const [nftType, setNftType] = useState(null);
  const [selectedContact, setSelectedContact] = useState(contact || null);
  const contacts = useSelector(state => state.user.contacts, shallowEqual);
  const isSuccess = transaction?.status === TRANSACTION_STATUS.success;
  const isError = transaction?.status === TRANSACTION_STATUS.error;

  const handleSaveContact = () => {
    saveContactRef.current?.open();
  };

  useGetType(nft?.url, setNftType);

  useEffect(() => {
    setSelectedContact(contacts?.find(c => c.id === to));
  }, [contacts, to]);

  const handleClose = () => {
    onClose();
    dispatch(setTransaction(null));

    if (isSuccess) {
      onSuccess?.();
    }
    if (isError) {
      onError?.();
    }
    navigation.navigate(Routes.TOKENS);
  };

  const handleGoToActivity = () => {
    handleClose();
    navigation.navigate(Routes.PROFILE_SCREEN);
  };

  const { title, ReviewIcon } = useMemo(
    () =>
      ({
        [TRANSACTION_STATUS.success]: {
          title: t('reviewSend.transactionSuccess'),
          ReviewIcon: <Icon name="confirm" style={styles.icon} />,
        },
        [TRANSACTION_STATUS.error]: {
          title: t('reviewSend.transactionError'),
          ReviewIcon: <Icon name="error" style={styles.icon} />,
        },
        pending: {
          title: t('reviewSend.transactionPending'),
          ReviewIcon: null,
        },
      }[transaction?.status || 'pending']),
    [transaction]
  );

  return (
    <Modal
      modalRef={modalRef}
      onClose={handleClose}
      {...props}
      fullHeight={isSuccess || isError}>
      <View style={styles.content}>
        <Header center={<Text type="subtitle2">{title}</Text>} />
        {ReviewIcon}
        {token && (
          <Row style={styles.row}>
            <Column>
              <Text type="caption" style={styles.title}>
                {`${amount?.display} ${token.symbol}`}
              </Text>
              {value ? (
                <Text style={styles.subtitle}>${value?.display}</Text>
              ) : null}
            </Column>
            <TokenIcon {...token} color={Colors.Gray.Tertiary} />
          </Row>
        )}
        {nft && (
          <Row style={styles.row}>
            <Column>
              <Text style={styles.title}>{`#${nft.index}`}</Text>
              <Text type="subtitle3">{nft.name || `${nft.collection}`}</Text>
            </Column>
            <NftDisplayer url={nft.url} type={nftType} isSend />
          </Row>
        )}
        <Row style={[styles.row, styles.toRow]}>
          <View style={styles.to}>
            <Text style={FontStyles.Normal}>{t('reviewSend.to')}</Text>
          </View>
          <Icon name="arrowDown" />
        </Row>
        <Row style={styles.row}>
          <Column>
            {selectedContact ? (
              <>
                <Text style={styles.title}>{selectedContact?.name}</Text>
                <Text style={styles.subtitle}>
                  {shortAddress(selectedContact?.id)}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>{shortAddress(to)}</Text>
                <Text
                  style={[FontStyles.Normal, styles.valid]}
                  onPress={handleSaveContact}>
                  {t('reviewSend.saveContact')}
                </Text>
              </>
            )}
          </Column>
          <UserIcon size="medium" />
        </Row>
        {token && (
          <Row style={styles.row}>
            <Text type="subtitle3">
              {t('reviewSend.totalFee', {
                value: `${token.fee} ${token?.symbol}`,
              })}
            </Text>
          </Row>
        )}
        {isSuccess ? (
          token && (
            <Button
              text={t('reviewSend.goToActivity')}
              buttonStyle={styles.button}
              onPress={handleGoToActivity}
            />
          )
        ) : (
          <>
            <RainbowButton
              text={
                isError
                  ? t('reviewSend.holdToRetry')
                  : t('reviewSend.holdToSend')
              }
              loading={loading}
              onLongPress={onSend}
              buttonStyle={styles.button}
            />
            {isError && (
              <Button
                text={t('common.cancel')}
                buttonStyle={styles.button}
                onPress={handleClose}
              />
            )}
          </>
        )}
      </View>
      <SaveContact modalRef={saveContactRef} id={to} />
    </Modal>
  );
};

export default ReviewSend;
