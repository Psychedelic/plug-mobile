import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import Image from '@/components/common/Image';
import SearchBar from '@/components/common/SearchBar';
import Text from '@/components/common/Text';
import Touchable from '@/components/common/Touchable';
import { DABToken } from '@/interfaces/dab';
import { getDabTokens } from '@/services/DAB';
import animationScales from '@/utils/animationScales';

import styles from './styles';

interface Props {
  onSelectedToken: (token: any) => void; //TODO: DEFINE TOKEN TYPE
}

export function TokenList({ onSelectedToken }: Props) {
  const [tokens, setTokens] = useState<DABToken[]>([]);
  const [loading, setLoading] = useState(true);

  function renderToken(token: DABToken) {
    return (
      <Touchable
        scale={animationScales.small}
        key={token.name}
        style={styles.item}
        onPress={() => onSelectedToken(token)}>
        <Image url={token.thumbnail} style={styles.logo} />
        <Text type="normal">{token.name}</Text>
      </Touchable>
    );
  }

  useEffect(() => {
    const getTokens = async () => {
      const tempTokens = await getDabTokens();
      setTokens(tempTokens);
      setLoading(false);
    };
    getTokens();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          placeholder={t('addToken.search')}
          style={styles.searchBar}
        />
        <Text style={styles.listTitle}>{t('addToken.availableTokens')}</Text>
        {loading ? (
          <ActivityIndicator style={styles.loader} size="small" color="white" />
        ) : (
          tokens.map((token: DABToken) => renderToken(token))
        )}
      </View>
    </>
  );
}
