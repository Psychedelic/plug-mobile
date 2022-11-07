import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Text from '@/components/common/Text';
import TokenItem from '@/components/tokens/TokenItem';
import { ICNS_CANISTER_ID } from '@/constants/canister';
import { ENABLE_NFTS } from '@/constants/nfts';
import NftItem from '@/screens/tabs/components/NftItem';

import styles from './styles';

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }) => {
  const { t } = useTranslation();
  const handleOnOpenNFT = nft => () => {
    onNftPress(nft);
  };

  // Filter ICNS since it's not tradable
  const filteredNFTS = nfts.filter(nft => nft.canister !== ICNS_CANISTER_ID);

  return (
    <>
      <Text type="subtitle3">{t('common.tokens')}</Text>
      {tokens.map(token => (
        <TokenItem
          token={token}
          key={token.symbol}
          onPress={() => onTokenPress(token)}
          style={styles.token}
        />
      ))}
      {ENABLE_NFTS && (
        <>
          <Text type="subtitle3" style={styles.nftText}>
            {t('common.collectibles')}
          </Text>
          <View style={styles.nftsContainer}>
            {filteredNFTS.map(item => (
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
