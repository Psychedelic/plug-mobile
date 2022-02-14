import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import NftDisplayer from '../../../../components/common/NftDisplayer';
import TokenFormat from '../../../../components/number/TokenFormat';
import { Colors, FontStyles } from '../../../../constants/theme';
import { TRANSACTION_STATUS } from '../../../../redux/constants';
import TokenIcon from '../../../../components/tokens/TokenIcon';
import { setTransaction } from '../../../../redux/slices/user';
import UserIcon from '../../../../components/common/UserIcon';
import shortAddress from '../../../../helpers/short-address';
import Button from '../../../../components/buttons/Button';
import Header from '../../../../components/common/Header';
import Column from '../../../../components/layout/Column';
import useGetType from '../../../../hooks/useGetType';
import Row from '../../../../components/layout/Row';
import Routes from '../../../../navigation/Routes';
import Modal from '../../../../components/modal';
import Icon from '../../../../components/icons';
import {
  formatSendAmount,
  getTransactionFee,
  USD_MAX_DECIMALS,
} from '../../utils';
import SaveContact from '../SaveContact';
import styles from './styles';

const ReviewSend = ({
  modalRef,
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
  ...props
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [nftType, setNftType] = useState(null);
  const contacts = useSelector(state => state.user.contacts, shallowEqual);
  const [selectedContact, setSelectedContact] = useState(contact || null);
  const saveContactRef = useRef(null);
  const transactionFee = getTransactionFee(token?.symbol);

  const handleSaveContact = () => {
    saveContactRef.current?.open();
  };

  useGetType(nft?.url, setNftType);

  useEffect(() => {
    setSelectedContact(contacts.find(c => c.id === to));
  }, [contacts, to]);

  const transactionCompleted =
    transaction?.status === TRANSACTION_STATUS.success;

  const handleClose = () => {
    onClose();
    dispatch(setTransaction(null));

    if (transactionCompleted) {
      onSuccess();
    }
  };

  const handleGoToActivity = () => {
    handleClose();
    navigation.navigate(Routes.PROFILE_SCREEN);
  };

  return (
    <Modal
      modalRef={modalRef}
      onClose={handleClose}
      {...props}
      adjustToContentHeight={!transactionCompleted}>
      <View style={styles.content}>
        <Header
          center={
            <Text style={FontStyles.Subtitle2}>
              {transactionCompleted ? 'Confirmed' : 'Review Send'}
            </Text>
          }
        />
        {transactionCompleted && <Icon name="confirm" style={styles.icon} />}
        {token && (
          <Row style={styles.row}>
            <Column>
              <Text style={FontStyles.Title2}>${value}</Text>
              <Text style={FontStyles.Subtitle3}>
                <TokenFormat value={amount} token={token.symbol} />
              </Text>
            </Column>
            <TokenIcon {...token} color={Colors.Gray.Tertiary} />
          </Row>
        )}
        {nft && (
          <Row style={styles.row}>
            <Column>
              <Text style={FontStyles.Title2}>
                {nft.name || `${nft.collection} #${nft.index}`}
              </Text>
            </Column>
            <NftDisplayer url={nft.url} type={nftType} isSend />
          </Row>
        )}
        <Row style={[styles.row, styles.toRow]}>
          <View style={styles.to}>
            <Text style={FontStyles.Normal}>To</Text>
          </View>
          <Icon name="arrowDown" />
        </Row>
        <Row style={styles.row}>
          <Column>
            {selectedContact ? (
              <>
                <Text style={FontStyles.Title2}>{selectedContact?.name}</Text>
                <Text style={FontStyles.Subtitle3}>
                  {shortAddress(selectedContact?.id)}
                </Text>
              </>
            ) : (
              <>
                <Text style={FontStyles.Title2}>{shortAddress(to)}</Text>
                <Text
                  style={[FontStyles.Normal, styles.valid]}
                  onPress={handleSaveContact}>
                  Save as contact
                </Text>
              </>
            )}
          </Column>
          <UserIcon size="medium" />
        </Row>
        <Row style={styles.row}>
          <Text style={FontStyles.Subtitle3}>
            {`Total Fee: ${transactionFee} ${
              token?.symbol
            } ($${formatSendAmount(
              transactionFee * tokenPrice,
              USD_MAX_DECIMALS + 1,
            )})`}
          </Text>
        </Row>
        {transactionCompleted ? (
          token &&
          token.symbol === 'ICP' && (
            <Button
              variant="gray"
              text="View in Activity"
              buttonStyle={styles.button}
              onPress={handleGoToActivity}
            />
          )
        ) : (
          <RainbowButton
            text="Hold to Send" // TODO: Check this title
            loading={loading}
            disabled={loading}
            onLongPress={onSend}
            buttonStyle={styles.button}
          />
        )}
      </View>
      <SaveContact modalRef={saveContactRef} id={to} />
    </Modal>
  );
};

export default ReviewSend;
