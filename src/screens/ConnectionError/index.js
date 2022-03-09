import React from 'react';
import { View, Image } from 'react-native';

import { ERROR_TYPES } from '../../components/common/ErrorState/constants';
import ErrorState from '../../components/common/ErrorState';
import PlugLogo from '../../assets/icons/il_white_plug.png';
import styles from './styles';

function ConnectionError() {
  //TODO: Add Network error handler.
  const handleRetry = () => {};

  return (
    <View style={styles.container}>
      <Image src={PlugLogo} style={styles.image} />
      <ErrorState
        errorType={ERROR_TYPES.CONNECTION_ERROR}
        onPress={handleRetry}
      />
    </View>
  );
}

export default ConnectionError;
