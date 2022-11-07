import Clipboard from '@react-native-community/clipboard';
import { useScrollToTop } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useMemo, useRef, useState } from 'react';
import { Alert, RefreshControl, ScrollView } from 'react-native';

import { ActionSheet, ErrorState, Text } from '@/components/common';
import TokenItem from '@/components/tokens/TokenItem';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import CopyIcon from '@/icons/material/Copy.svg';
import DeleteIcon from '@/icons/material/Delete.svg';
import SendIcon from '@/icons/material/Send.svg';
import { Container, Row, Separator } from '@/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getBalance, removeCustomToken } from '@/redux/slices/user';
import Send from '@/screens/flows/Send';
import { isDefaultToken } from '@/utils/assets';

import WalletHeader from '../components/WalletHeader';
import { AddToken } from './components/AddToken';
import styles from './styles';

function Tokens() {
  const dispatch = useAppDispatch();
  const { assets, assetsLoading, assetsError } = useAppSelector(
    state => state.user
  );
  const [selectedToken, setSelectedToken] = useState(null);

  const sendRef = useRef(null);
  const actionsRef = useRef(null);
  const listRef = useRef(null);
  useScrollToTop(listRef);

  const handleDelete = () => {
    Alert.alert(
      t('tokensTab.deleteTitle'),
      t('tokensTab.deleteMessage', { token: selectedToken?.name }),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('tokensTab.deleteAction'),
          style: 'destructive',
          onPress: () => {
            dispatch(removeCustomToken(selectedToken?.canisterId));
            setSelectedToken(null);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const tokenActions = useMemo(() => {
    const actions = [
      {
        id: 1,
        label: t('tokensTab.tokenActions.send'),
        onPress: sendRef.current?.open,
        icon: SendIcon,
      },
      {
        id: 2,
        label: t('tokensTab.tokenActions.copy'),
        onPress: () => {
          Clipboard.setString(selectedToken.canisterId);
          actionsRef.current?.close();
        },
        icon: CopyIcon,
      },
    ];
    if (!isDefaultToken(selectedToken?.canisterId)) {
      actions.push({
        id: 3,
        label: t('tokensTab.tokenActions.delete'),
        destructive: true,
        onPress: handleDelete,
        icon: DeleteIcon,
      });
    }
    return actions;
  }, [selectedToken]);

  const usdSum = Number(
    assets.reduce(
      (total, token) => (token?.value ? total + Number(token?.value) : total),
      0
    )
  ).toFixed(2);

  const handleRefresh = () => {
    dispatch(getBalance());
  };

  const handleTokenPress = token => () => {
    setSelectedToken(token);
    actionsRef.current?.open();
  };

  return (
    <Container>
      <WalletHeader />
      <Row style={styles.rowStyle}>
        <Text style={styles.title}>{t('common.tokens')}</Text>
        <Text style={styles.title}>{`$${usdSum}`}</Text>
      </Row>
      <Separator />
      {!assetsError ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            contentContainerStyle={styles.scrollContent}
            ref={listRef}
            refreshing={assetsLoading}
            refreshControl={
              <RefreshControl
                refreshing={assetsLoading}
                onRefresh={handleRefresh}
                tintColor={Colors.White.Primary}
              />
            }>
            {assets?.map(token => (
              <TokenItem
                token={token}
                key={token.symbol}
                onPress={handleTokenPress(token)}
                style={styles.tokenItem}
              />
            ))}
          </ScrollView>
          <AddToken />
        </>
      ) : (
        <ErrorState
          onPress={handleRefresh}
          errorType={ERROR_TYPES.FETCH_ERROR}
        />
      )}
      <Send modalRef={sendRef} token={selectedToken} />
      <ActionSheet
        modalRef={actionsRef}
        options={tokenActions}
        optionTextStyle={styles.optionText}
      />
    </Container>
  );
}

export default Tokens;
