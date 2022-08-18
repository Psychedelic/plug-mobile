import { t } from 'i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, Linking, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Image from '@/components/common/Image';
import SearchBar from '@/components/common/SearchBar';
import Text from '@/components/common/Text';
import Touchable from '@/components/common/Touchable';
import DABLogo from '@/components/icons/svg/DAB.svg';
import IncognitoLogo from '@/components/icons/svg/Incognito.svg';
import { dabFormUrl } from '@/constants/urls';
import { DABToken } from '@/interfaces/dab';
import animationScales from '@/utils/animationScales';

import CustomToken from '../CustomToken';
import styles, { incognitoColor } from './styles';

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
      <Touchable
        scale={animationScales.small}
        key={token.name}
        style={styles.item}
        onPress={() => onSelectedToken(token)}>
        {token.thumbnail || token.logo ? (
          <Image url={token.thumbnail || token.logo} style={styles.logo} />
        ) : (
          <View style={[styles.logo, styles.incognitoLogo]}>
            <IncognitoLogo fill={incognitoColor} width={34} height={34} />
          </View>
        )}
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
        <Text
          type="body2"
          style={styles.emptyLink}
          onPress={handleCustomModalOpen}>
          {t('addToken.addCustomToken')}
        </Text>
      </View>
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
    if (search === '') {
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
              {search.length
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
