import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, TextInput, TextInputComponent } from 'react-native';
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
  const [URI, setUri] = useState();

  const clientMeta = {
    description: 'Plug IC Wallet ',
    icons: [],
    name: 'Plug Wallet',
    ssl: true,
    url: 'https://plugwallet.ooo',
  };

  const onPress = () => {
    const connector = new WCClient({
      clientMeta,
      uri: 'wc:53e80bfd-58da-4b43-84a7-e00ca30420ae@1?bridge=https%3A%2F%2Fw.bridge.walletconnect.org&key=1b39b88572d3888a3e3bea3dc301769b00bf902c48e84d63107456c1d4042fed',
    });
    connector?.on('session_request', (error, payload) => {
      console.log('------------------------ SESSION REQUEST --------------');
      console.log('PAYLOAD: ', JSON.stringify(payload, null, 2));
      console.log('--------------------------------------');
    });
  };

  return (
    <Container>
      <View style={styles.container}>
        <Image source={Plug} style={styles.plugIcon} />
        <Text style={styles.title}>Wallet Connect</Text>

        <RainbowButton
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text="Connect"
          onPress={onPress}
        />

        <View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="#373946"
            style={styles.input}
            placeholder="0.00"
            onChangeText={input => setUri(input.target.value)}
          />
        </View>
      </View>
    </Container>
  );
}

export default WalletConnect;
