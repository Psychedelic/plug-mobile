import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

import Plug from '@/assets/icons/il_white_plug.png';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Container } from '@/layout';
import { useNavigation } from '@/utils/navigation';

import styles from './styles';

function WalletConnect() {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { callback } = params;
  const meta = params.meta || {};
  const { dappName, dappUrl, dappScheme, peerId } = meta;

  const handleSuccess = useCallback(
    (success = false) => {
      if (callback) {
        setTimeout(
          () =>
            callback({
              approved: success,
              chainId: 1,
              accountAddress: 'approvalAccount.address',
              peerId,
              dappScheme,
              dappName,
              dappUrl,
            }),
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
    goBack();
  };

  return (
    <Container>
      <View style={styles.container}>
        {!Object.keys(meta).length ? (
          <ActivityIndicator size="large" />
        ) : (
          // TODO: changes on this screen after desings
          <>
            <Image source={Plug} style={styles.plugIcon} />
            <Text style={styles.title}>Wallet Connect</Text>
            <Text style={styles.title}>{`DAP URL: ${dappUrl}`}</Text>
            <Text style={styles.title}>{`DAP NAME: ${dappName}`}</Text>
            <RainbowButton
              buttonStyle={[styles.componentMargin, styles.buttonStyling]}
              text="Connect"
              onPress={onPress}
            />
          </>
        )}
      </View>
    </Container>
  );
}

export default WalletConnect;
