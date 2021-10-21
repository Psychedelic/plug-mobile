import React from 'react';
import useTokens from '../../../hooks/useTokens';
import { Text } from 'react-native';
import Touchable from '../../../components/animations/Touchable';
import TokenItem from '../../../components/tokens/TokenItem';
import animationScales from '../../../utils/animationScales';
import { FontStyles, Colors } from '../../../constants/theme';

const TokenSection = ({ onPress }) => {
  const { tokens } = useTokens();
  return (
    <>
      <Text style={FontStyles.Subtitle3}>Tokens</Text>
      {tokens.map(token => (
        <Touchable scale={animationScales.small} onPress={() => onPress(token)}>
          <TokenItem
            {...token}
            color={Colors.Gray.Tertiary}
            style={{ marginTop: 20 }}
          />
        </Touchable>
      ))}
    </>
  );
};

export default TokenSection;
