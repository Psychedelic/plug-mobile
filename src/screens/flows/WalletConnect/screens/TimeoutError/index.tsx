import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { Linking, View } from 'react-native';

import Button from '@/components/buttons/Button';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import useDisableBack from '@/hooks/useDisableBack';
import { RootStackParamList } from '@/interfaces/navigation';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';

import styles from './styles';

interface Props {
  route: {
    params: {
      dappUrl: string;
      dappName: string;
    };
  };
}

function WCTimeoutError({ route }: Props) {
  useDisableBack();
  const { dappUrl, dappName } = route?.params || {};
  const { reset } = useNavigation<NavigationProp<RootStackParamList>>();

  const gotoDapp = () => {
    Linking.openURL(dappUrl);
  };

  const onStartAgain = () => {
    reset({
      index: 1,
      routes: [{ name: Routes.SWIPE_LAYOUT }],
    });
    gotoDapp();
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.icon}>⏳</Text>
        <Text type="subtitle2" style={styles.title}>
          {t('walletConnect.timeOutTitle')}
        </Text>
        <Text style={[FontStyles.NormalGray, styles.subtitle]}>
          {t('common.the')}
          <Text onPress={gotoDapp} style={styles.validText}>
            {` ${dappName} `}
          </Text>
          {t('walletConnect.timeOutSubtitle')}
        </Text>
        <Button
          onPress={onStartAgain}
          text={t('walletConnect.startAgain')}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </Container>
  );
}

export default WCTimeoutError;
