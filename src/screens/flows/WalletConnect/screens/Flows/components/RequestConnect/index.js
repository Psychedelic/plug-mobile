import { t } from 'i18next';
import React from 'react';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CommonItem from '@/commonComponents/CommonItem';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Colors, FontStyles } from '@/constants/theme';

import styles from './styles';

function RequestConnect({
  request,
  args,
  metadata,
  sendLoading,
  onPressSend,
  onPressCancel,
}) {
  const { dappName } = request;
  const { whitelist } = args;
  const whiteListArray = Object.entries(whitelist);

  const renderWhiteList = (item, index) => {
    const [cannisterId, { name, icon }] = item;

    return (
      <CommonItem
        name={name}
        key={index}
        imageUri={icon}
        id={cannisterId}
        onPress={() => {
          Linking.openURL(`https://icscan.io/canister/${cannisterId}`);
        }}
        style={styles.cannisterItem}
        actionIconName="redirectArrow"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLogo}>
        <Image source={{ uri: metadata?.icons[0] }} style={styles.logo} />
      </View>
      <Text style={[FontStyles.Title, styles.dappName]}>{dappName}</Text>
      <Text style={[FontStyles.NormalGray, styles.subtitle]}>
        {t('walletConnect.cannisterPermission')}
      </Text>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        {whiteListArray.map(renderWhiteList)}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={[Colors.Transparent, Colors.Black.Primary]}
          style={styles.gradient}
        />
        <View style={styles.buttonContainer}>
          <Button
            text={t('walletConnect.decline')}
            buttonStyle={styles.buttonStyle}
            onPress={onPressCancel}
          />
          <RainbowButton
            loading={sendLoading}
            text={t('walletConnect.allow')}
            buttonStyle={styles.buttonStyle}
            onPress={onPressSend}
          />
        </View>
      </View>
    </View>
  );
}

export default RequestConnect;
