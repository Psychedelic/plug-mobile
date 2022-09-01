import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Text from '@/components/common/Text';
import TokenItem from '@/components/tokens/TokenItem';
import { ENABLE_NFTS } from '@/constants/nfts';
import { Colors } from '@/constants/theme';
import NftItem from '@/screens/tabs/components/NftItem';

import styles from './styles';

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }) => {
  const { t } = useTranslation();
  const handleOnOpenNFT = nft => () => {
    onNftPress(nft);
  };

  return (
    <>
      <Text type="subtitle3">{t('common.tokens')}</Text>
      {tokens.map(token => (
        <TokenItem
          token={token}
          key={token.symbol}
          onPress={() => onTokenPress(token)}
          color={Colors.Gray.Tertiary}
          style={styles.token}
        />
      ))}
      {ENABLE_NFTS && (
        <>
          <Text type="subtitle3" style={styles.nftText}>
            {t('common.collectibles')}
          </Text>
          <View style={styles.nftsContainer}>
            {nfts.map(item => (
              <NftItem
                key={`${item.canisterId}_${item.index}`}
                item={item}
                onOpen={handleOnOpenNFT}
              />
            ))}
          </View>
        </>
      )}
    </>
  );
};

export default TokenSection;
