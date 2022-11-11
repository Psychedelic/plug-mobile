import { useNavigation } from '@react-navigation/core';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import NftDisplayer from '@/commonComponents/NftDisplayer';
import UserIcon from '@/commonComponents/UserIcon';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import TokenIcon from '@/components/tokens/TokenIcon';
import { VISIBLE_DECIMALS } from '@/constants/business';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';
import { Asset, Contact } from '@/interfaces/redux';
import { Column } from '@/layout';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setTransaction } from '@/redux/slices/user';
import { TRANSACTION_STATUS } from '@/redux/utils';
import { FormattedCollection } from '@/utils/assets';
import { truncate } from '@/utils/number';
import shortAddress from '@/utils/shortAddress';

import { Receiver } from '../..';
import { Amount } from '../../interfaces';
import { getFeePrice } from '../../utils';
import SaveContact from '../SaveContact';
import styles from './styles';

interface Props {
  modalRef: React.RefObject<Modalize>;
  onSend: () => void;
  onClose: () => void;
  token?: Asset;
  nft?: FormattedCollection;
  amount?: Amount;
  value?: Amount;
  contact?: Receiver;
  isNewContact?: boolean;
  onContactSaved?: (contact: Contact) => void;
  transaction?: { status: string | null };
  loading?: boolean;
  adjustToContentHeight?: boolean;
}

const ReviewSend = ({
  modalRef,
  token,
  nft,
  amount,
  value,
  contact,
  isNewContact,
  onSend,
  onClose,
  onContactSaved,
  transaction,
  loading,
  adjustToContentHeight,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const saveContactRef = useRef<Modalize>(null);
  const isSuccess = transaction?.status === TRANSACTION_STATUS.success;
  const isError = transaction?.status === TRANSACTION_STATUS.error;
  const { icpPrice } = useAppSelector(state => state.icp);
  const feePrice = token?.symbol
    ? getFeePrice(token.symbol, icpPrice, token?.fee)
    : null;

  const handleSaveContact = () => {
    saveContactRef.current?.open();
  };

  const nftType = useGetType(nft?.url);

  const handleClose = () => {
    onClose?.();
    dispatch(setTransaction(null));

    if (isSuccess) {
      navigation.navigate(Routes.TOKENS);
    }
  };

  const handleGoToActivity = () => {
    modalRef.current?.close();
    navigation.navigate(Routes.PROFILE);
  };

  const { title, ReviewIcon } = useMemo(
    () =>
      ({
        [TRANSACTION_STATUS.success]: {
          title: t('reviewSend.transactionSuccess'),
          ReviewIcon: <Icon name="transactionSuccess" style={styles.icon} />,
        },
        [TRANSACTION_STATUS.error]: {
          title: t('reviewSend.transactionError'),
          ReviewIcon: <Icon name="transactionError" style={styles.icon} />,
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
      adjustToContentHeight={adjustToContentHeight}
      onBackButtonPress={() => true}
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
            <TokenIcon {...token} />
          </Row>
        )}
        {nft && (
          <Row style={styles.row}>
            <Column>
              <Text style={styles.title}>{`#${nft.index}`}</Text>
              <Text type="subtitle3">{nft.collectionName}</Text>
            </Column>
            <NftDisplayer
              url={nft.url}
              type={nftType}
              style={styles.nft}
              canisterId={nft.canister}
              itemId={nft.index}
            />
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
            {isNewContact ? (
              <>
                <Text style={styles.title}>
                  {contact?.icnsId || shortAddress(contact?.id)}
                </Text>
                <Text
                  style={[FontStyles.Normal, styles.valid]}
                  onPress={handleSaveContact}>
                  {t('reviewSend.saveContact')}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>{contact?.name}</Text>
                <Text style={styles.subtitle}>
                  {contact?.icnsId || shortAddress(contact?.id)}
                </Text>
              </>
            )}
          </Column>
          <UserIcon icon={contact?.image} size="medium" />
        </Row>
        {token && (
          <Row style={styles.row}>
            <Text type="subtitle3">
              {t('reviewSend.totalFee', {
                value: `${token.fee} ${token?.symbol}`,
              })}
              {feePrice ? ` ($${truncate(feePrice, VISIBLE_DECIMALS)})` : null}
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
              onPress={() => {}}
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
      {isNewContact && contact?.id && (
        <SaveContact
          modalRef={saveContactRef}
          id={contact?.icnsId || contact.id}
          onSaved={onContactSaved}
        />
      )}
    </Modal>
  );
};

export default ReviewSend;
