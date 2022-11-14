import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Text from '@/components/common/Text';
import TokenItem from '@/components/tokens/TokenItem';
import { ICNS_CANISTER_ID } from '@/constants/canister';
import { ENABLE_NFTS } from '@/constants/nfts';
import { Asset } from '@/interfaces/redux';
import NftItem from '@/screens/tabs/components/NftItem';
import { FormattedCollection } from '@/utils/assets';

import styles from './styles';

interface Props {
  tokens?: Asset[];
  nfts?: FormattedCollection[];
  onTokenPress: (token: Asset) => void;
  onNftPress: (nft: FormattedCollection) => void;
}

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }: Props) => {
  const { t } = useTranslation();
  const handleOnOpenNFT = (nft: FormattedCollection) => {
    onNftPress(nft);
  };

  // Filter ICNS since it's not tradable
  const filteredNFTS =
    nfts?.filter(nft => nft.canister !== ICNS_CANISTER_ID) || [];

  return (
    <>
      <Text type="subtitle3">{t('common.tokens')}</Text>
      {tokens?.map(token => (
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
            {filteredNFTS.map(item => {
              return (
                <NftItem
                  key={`${item.canister}_${item.index}`}
                  onPress={() => handleOnOpenNFT(item)}
                  url={item.url}
                  title={`${item?.collectionName} #${item.index}`}
                  titleStyle={styles.itemTitle}
                  canisterId={item.canister}
                  itemId={item.index}
                  containerStyle={styles.itemContainer}
                />
              );
            })}
          </View>
        </>
      )}
    </>
  );
};

export default TokenSection;
