import React from 'react';
import useTokens from '../../../hooks/useTokens';
import { View, Text } from 'react-native';
import Touchable from '../../../components/animations/Touchable';
import TokenItem from '../../../components/tokens/TokenItem';
import animationScales from '../../../utils/animationScales';
import { FontStyles, Colors } from '../../../constants/theme';
import useNfts from '../../../hooks/useNfts';
import NftItem from '../../../components/common/NftItem';

const TokenSection = ({ tokens, nfts, onTokenPress, onNftPress }) => {
  // const { tokens } = useTokens();
  // const { nfts } = useNfts();

  return (
    <>
      <Text style={FontStyles.Subtitle3}>Tokens</Text>
      {tokens.map(token => (
        <Touchable
          scale={animationScales.small}
          onPress={() => onTokenPress(token)}>
          <TokenItem
            {...token}
            color={Colors.Gray.Tertiary}
            style={{ marginTop: 20 }}
          />
        </Touchable>
      ))}
      <Text style={[FontStyles.Subtitle3, { marginTop: 25 }]}>NFTs</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {nfts.map(nft => (
          <Touchable
            scale={animationScales.small}
            onPress={() => onNftPress(nft)}>
            <NftItem {...nft} style={{ marginTop: 15 }} />
          </Touchable>
        ))}
      </View>
    </>
  );
};

export default TokenSection;
