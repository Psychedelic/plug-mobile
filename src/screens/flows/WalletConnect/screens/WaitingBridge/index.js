import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Container } from '@/layout';
import { updateBridgeTimeout } from '@/redux/slices/walletconnect';
import { useNavigation } from '@/utils/navigation';

import styles from '../../styles';

function WalletConnectWaitingBridge() {
  const dispatch = useDispatch();
  const [timedOut, setTimedOut] = useState(false);
  const { goBack } = useNavigation();

  const onBridgeContact = () => {
    goBack();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('BRIDGE TIMED OUT');
      setTimedOut(true);
    }, 20000);
    dispatch(updateBridgeTimeout({ timeout, onBridgeContact }));
  }, []);

  return (
    <Container>
      <View style={styles.container}>
        {timedOut ? (
          <Text style={styles.title}> TIMEDOUT </Text>
        ) : (
          <>
            <Text style={styles.title}> WAITING </Text>
            <ActivityIndicator size="large" />
          </>
        )}
      </View>
    </Container>
  );
}

export default WalletConnectWaitingBridge;
