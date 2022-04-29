import React from 'react';
import { View, Image, Linking } from 'react-native';

import { ERROR_TYPES } from '@commonComponents/ErrorState/constants';
import ErrorState from '@commonComponents/ErrorState';
import PlugLogo from '@assets/icons/il_white_plug.png';

import styles from './styles';

function ErrorBoundaryScreen() {
  const handleJoinDiscord = () => {
    Linking.openURL(
      'https://discord.com/channels/837010835423494144/959517549693907014',
    );
  };

  return (
    <View style={styles.container}>
      <Image source={PlugLogo} style={styles.image} />
      <ErrorState
        style={styles.errorState}
        onPress={handleJoinDiscord}
        buttonStyle={styles.buttonStyle}
        errorType={ERROR_TYPES.ERROR_BOUNDARY}
      />
    </View>
  );
}

export default ErrorBoundaryScreen;
