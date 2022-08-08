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
  const [filteredTokens, setFilteredTokens] = useState<DABToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  function renderEmptyState() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emoji}>🤔</Text>
        <Text type="body2" style={styles.emptyText}>
          {t('addToken.noResults')}
        </Text>
        <Text type="body2" style={styles.emptyLink}>
          {t('addToken.addToken')}
        </Text>
      </View>
    );
  }

  useEffect(() => {
    const getTokens = async () => {
      const tempTokens = await getDabTokens();
      setTokens(tempTokens);
      setFilteredTokens(tempTokens);
      setLoading(false);
    };
    getTokens();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredTokens(tokens);
    } else {
      const filtered = tokens.filter(token =>
        token.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTokens(filtered);
    }
  }, [search]);

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          placeholder={t('addToken.search')}
          onChangeText={setSearch}
        />
        {loading ? (
          <ActivityIndicator style={styles.loader} size="small" color="white" />
        ) : filteredTokens.length ? (
          <>
            <Text style={styles.listTitle}>
              {t('addToken.availableTokens')}
            </Text>
            {filteredTokens.map((token: DABToken) => renderToken(token))}
          </>
        ) : (
          renderEmptyState()
        )}
      </View>
    </>
  );
}
