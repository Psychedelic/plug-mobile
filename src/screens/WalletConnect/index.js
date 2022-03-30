import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import WCClient from '@walletconnect/client';

import RainbowButton from '../../components/buttons/RainbowButton';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/il_white_plug.png';
import { FontStyles } from '../../constants/theme';
import Routes from '../../navigation/Routes';
import styles from './styles';
import useDeepLink from '../../hooks/useDeepLink';

function WalletConnect() {
  const { params } = useRoute();
  const { callback } = params;
  const { dappName, dappUrl, dappScheme, peerId } = params.meta || {};

  const handleSuccess = useCallback(
    (success = false) => {
      if (callback) {
        setTimeout(
          () =>
            callback(
              success,
              1,
              'approvalAccount.address',
              peerId,
              dappScheme,
              dappName,
              dappUrl,
            ),
          300,
        );
      }
    },
    [
      'approvalAccount.address',
      callback,
      peerId,
      dappScheme,
      dappName,
      dappUrl,
    ],
  );

  const onPress = () => {
    handleSuccess(true);
  };

  return (
    <Container>
      <View style={styles.container}>
        <Image source={Plug} style={styles.plugIcon} />
        <Text style={styles.title}>Wallet Connect</Text>
        <Text style={styles.title}>{`DAP URL: ${dappUrl}`}</Text>
        <Text style={styles.title}>{`DAP NAME: ${dappName}`}</Text>

        <RainbowButton
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text="Connect"
          onPress={onPress}
        />
      </View>
    </Container>
  );
}

export default WalletConnect;
