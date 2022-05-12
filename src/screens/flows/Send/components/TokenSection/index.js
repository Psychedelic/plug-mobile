import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import TokenItem from '@/components/tokens/TokenItem';
import { ENABLE_NFTS } from '@/constants/nfts';
import { Colors, FontStyles } from '@/constants/theme';
import NftItem from '@/screens/tabs/components/NftItem';

import styles from './styles';

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }) => {
  const { t } = useTranslation();
  const handleOnOpenNFT = nft => () => {
    onNftPress(nft);
  };

  return (
    <>
      <Text style={FontStyles.Subtitle3}>{t('common.tokens')}</Text>
      {tokens.map(token => (
        <TokenItem
          {...token}
          key={token.symbol}
          onPress={() => onTokenPress(token)}
          color={Colors.Gray.Tertiary}
          style={styles.token}
        />
      ))}
      {ENABLE_NFTS && (
        <>
          <Text style={styles.title}>{t('common.collectibles')}</Text>
          <View style={styles.nftsContainer}>
            {nfts.map((item, index) => (
              <NftItem
                key={index}
                item={item}
                onOpen={handleOnOpenNFT}
                isSend
              />
            ))}
          </View>
        </>
      )}
    </>
  );
};

export default TokenSection;
