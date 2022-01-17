import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Touchable from '../../../components/animations/Touchable';
import NftItem from '../../Wallet/tabs/NFTs/components/NftItem';
import { FontStyles, Colors } from '../../../constants/theme';
import TokenItem from '../../../components/tokens/TokenItem';
import animationScales from '../../../utils/animationScales';

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }) => {
  const handleOnOpenNFT = nft => () => {
    onNftPress(nft);
  };

  return (
    <>
      <Text style={FontStyles.Subtitle3}>Tokens</Text>
      {tokens.map(token => (
        <Touchable
          key={token.symbol}
          scale={animationScales.small}
          onPress={() => onTokenPress(token)}>
          <TokenItem
            {...token}
            color={Colors.Gray.Tertiary}
            style={styles.token}
          />
        </Touchable>
      ))}
      <Text style={styles.title}>NFTs</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {nfts.map((item, index) => (
          <NftItem key={index} item={item} onOpen={handleOnOpenNFT} />
        ))}
      </View>
    </>
  );
};

export default TokenSection;

const styles = StyleSheet.create({
  token: {
    marginTop: 20,
  },
  title: {
    ...FontStyles.Subtitle3,
    marginTop: 25,
  },
  nftText: {
    ...FontStyles.SmallGray,
    marginTop: 10,
  },
  nft: {
    margin: 10,
  },
});
