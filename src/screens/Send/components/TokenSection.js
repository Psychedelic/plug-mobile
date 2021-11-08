import React from 'react';
import useTokens from '../../../hooks/useTokens';
import { Text } from 'react-native';
import Touchable from '../../../components/animations/Touchable';
import TokenItem from '../../../components/tokens/TokenItem';
import animationScales from '../../../utils/animationScales';
import { FontStyles, Colors } from '../../../constants/theme';
import useNfts from '../../../hooks/useNfts';
import NftItem from '../../../components/common/NftItem';

const TokenSection = ({ onTokenPress, onNftPress }) => {
  const { tokens } = useTokens();
  const { nfts } = useNfts();

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
      {nfts.map(nft => (
        <Touchable
          scale={animationScales.small}
          onPress={() => onNftPress(nft)}>
          <NftItem {...nft} style={{ marginTop: 20 }} />
        </Touchable>
      ))}
    </>
  );
};

export default TokenSection;
