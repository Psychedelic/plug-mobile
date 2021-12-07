import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Touchable from '../../../components/animations/Touchable';
import TokenItem from '../../../components/tokens/TokenItem';
import animationScales from '../../../utils/animationScales';
import { FontStyles, Colors } from '../../../constants/theme';
import NftDisplayer from '../../../components/common/NftDisplayer';

const { width } = Dimensions.get('window');
const itemSize = width / 2 - 40;

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }) => {
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
        {nfts.map(item => (
          /* <Touchable
              key={nft.url}
              scale={animationScales.small}
              onPress={() => onNftPress(nft)}>
              <NftItem {...nft} style={{ marginTop: 15 }} />
           </Touchable>*/
          <View key={`${item.canisterId}_${item.index}`} style={styles.nft}>
            <Touchable onPress={() => onNftPress(item)}>
              <NftDisplayer
                url={item.url}
                style={{ width: itemSize, height: itemSize }}
              />
            </Touchable>
            <Text style={styles.nftText}>
              {item.name || `${item.collection} #${item.index}`}
            </Text>
          </View>
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