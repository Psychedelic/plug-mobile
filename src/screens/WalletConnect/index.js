import React, { useCallback } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

import RainbowButton from '../../components/buttons/RainbowButton';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/il_white_plug.png';
import styles from './styles';
import { useNavigation } from '../../helpers/navigation';

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
              approve: success,
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