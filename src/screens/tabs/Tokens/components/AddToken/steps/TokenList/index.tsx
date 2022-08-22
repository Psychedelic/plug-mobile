import { t } from 'i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, Linking, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { EmptyState, SearchBar, Text, Touchable } from '@/components/common';
import DABLogo from '@/components/icons/svg/DAB.svg';
import TokenItem from '@/components/tokens/TokenItem';
import { dabFormUrl } from '@/constants/urls';
import { DABToken } from '@/interfaces/dab';

import CustomToken from '../CustomToken';
import styles from './styles';

interface Props {
  onSelectedToken: (token: DABToken) => void;
  tokens: DABToken[];
  loading: boolean;
}

export function TokenList({ onSelectedToken, tokens, loading }: Props) {
  const [filteredTokens, setFilteredTokens] = useState<DABToken[]>(tokens);
  const [search, setSearch] = useState('');
  const modalRef = useRef<Modalize>(null);

  function renderToken(token: DABToken) {
    return (
      <TokenItem
        key={token.name}
        token={{
          name: token.name,
          logo: token.logo,
          thumbnail: token.thumbnail,
        }}
        style={styles.item}
        onPress={() => onSelectedToken(token)}
      />
    );
  }

  function renderEmptyState() {
    return (
      <EmptyState
        title={t('addToken.noResults')}
        text={t('addToken.addCustomToken')}
        style={styles.emptyState}
        onTextPress={handleCustomModalOpen}
      />
    );
  }

  const handleCustomModalOpen = () => {
    Keyboard.dismiss();
    modalRef?.current?.open();
  };

  const handleOpenDabForm = useCallback(() => {
    Linking.canOpenURL(dabFormUrl).then(() => Linking.openURL(dabFormUrl));
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredTokens(tokens);
    } else {
      const filtered = tokens.filter(
        token =>
          token.name.toLowerCase().includes(search.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search.toLowerCase())
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
          onActionPress={handleCustomModalOpen}
        />
        {loading ? (
          <ActivityIndicator style={styles.loader} size="small" color="white" />
        ) : filteredTokens.length ? (
          <>
            <Text style={styles.listTitle}>
              {search?.length
                ? t('addToken.searchResults')
                : t('addToken.availableTokens')}
            </Text>
            {filteredTokens.map((token: DABToken) => renderToken(token))}
            {!search && (
              <Touchable
                style={styles.dabContainer}
                onPress={handleOpenDabForm}>
                <DABLogo height={27} width={27} />
                <Text type="subtitle3" style={styles.dabText}>
                  {t('addToken.poweredByDab')}
                </Text>
              </Touchable>
            )}
          </>
        ) : (
          renderEmptyState()
        )}
      </View>
      <CustomToken modalRef={modalRef} onSelectedToken={onSelectedToken} />
    </>
  );
}
