import { t } from 'i18next';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import UserIcon from '@/components/common/UserIcon';
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
  const { currentWallet } = useSelector(state => state.keyring);
  const { dappUrl, dappName } = request;
  const { domainUrl, whitelist } = args;
  // console.tron.log('args', args);
  // console.tron.log('request', request);
  const whiteListArray = Object.entries(whitelist);

  const renderWhiteList = (item, index) => {
    const [cannisterId, { name, icon }] = item;

    return (
      <CommonItem
        name={name}
        key={index}
        imageUri={icon}
        id={cannisterId}
        // onPress={() => onPress(contact)}
        style={styles.cannisterItem}
        actionIconName="redirectArrow"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLogo}>
        <Image
          source={{ uri: 'https://sonic.ooo/images/logo.png' }}
          // source={{ uri: request.imageUrl }}
          style={styles.logo}
        />
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
        <View style={styles.changeWalletContainer}>
          <View style={styles.userContainer}>
            <UserIcon size="small" />
            <Text style={[FontStyles.Normal, styles.user]}>
              {currentWallet?.name}
            </Text>
          </View>
          <Text style={[FontStyles.NormalGray, styles.valid]}>
            {t('walletConnect.changeWallet')}
          </Text>
        </View>
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
