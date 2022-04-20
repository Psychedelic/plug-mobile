import React from 'react';
import { View, Text } from 'react-native';

import NftItem from '../../../Wallet/tabs/NFTs/components/NftItem';
import { FontStyles, Colors } from '../../../../constants/theme';
import TokenItem from '../../../../components/tokens/TokenItem';
import styles from './styles';

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }) => {
  const handleOnOpenNFT = nft => () => {
    onNftPress(nft);
  };

  return (
    <>
      <Text style={FontStyles.Subtitle3}>Tokens</Text>
      {tokens.map(token => (
        <TokenItem
          {...token}
          key={token.symbol}
          onPress={() => onTokenPress(token)}
          color={Colors.Gray.Tertiary}
          style={styles.token}
        />
      ))}
      <Text style={styles.title}>Collectibles</Text>
      <View style={styles.nftsContainer}>
        {nfts.map((item, index) => (
          <NftItem key={index} item={item} onOpen={handleOnOpenNFT} isSend />
        ))}
      </View>
    </>
  );
};

export default TokenSection;
