import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  InteractionManager,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Plug from '@/assets/icons/il_white_plug.png';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Container } from '@/layout';
import {
  walletConnectExecuteAndResponse,
  walletConnectRemovePendingRedirect,
} from '@/redux/slices/walletconnect';
import { useNavigation } from '@/utils/navigation';

import styles from '../../styles';
import WalletConnectLayaout from '..';

function RequestCall() {
  const { params } = useRoute();
  const { methodName } = params.args;
  const { dappUrl, dappName } = params.request;

  return (
    <Container>
      <View style={styles.container}>
        {!Object.keys(params).length ? (
          <ActivityIndicator size="large" />
        ) : (
          // TODO: changes on this screen after desings
          <WalletConnectLayaout>
            <Text style={styles.text}>{`DAP URL: ${dappUrl}`}</Text>
            <Text style={styles.text}>{`DAP NAME: ${dappName}`}</Text>
            <Text style={styles.text}>{`METHOD: ${methodName}`}</Text>
          </WalletConnectLayaout>
        )}
      </View>
    </Container>
  );
}

export default RequestCall;
