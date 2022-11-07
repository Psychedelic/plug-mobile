import { t } from 'i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { ActionButton, Header, Text } from '@/components/common';
import { Colors } from '@/constants/theme';
import { DABToken } from '@/interfaces/dab';
import { StandardToken } from '@/interfaces/keyring';
import { getDabTokens } from '@/services/DAB';

import { ReviewToken } from '../steps/ReviewToken';
import { TokenList } from '../steps/TokenList';

interface Return {
  currentStep: {
    component: React.ReactNode;
    header?: React.ReactNode;
    adjustModalContent?: boolean;
    fullHeight?: boolean;
  };
  setStep: (step: number) => void;
}

interface Props {
  handleModalClose?: () => void;
}

const useSteps = ({ handleModalClose }: Props): Return => {
  const [step, setStep] = useState<number>(0);
  const [tokens, setTokens] = useState<DABToken[]>([]);
  const [tokensLoading, setTokensLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState<
    DABToken | StandardToken
  >();

  const handleSelectedToken = useCallback((token: DABToken | StandardToken) => {
    setSelectedToken(token);
    setStep(1);
  }, []);

  const handleChangeStep = (index: number) => setStep(index);

  const handleClose = () => {
    handleModalClose?.();
  };

  useEffect(() => {
    const getTokens = async () => {
      const tempTokens = await getDabTokens();
      setTokens(tempTokens);
      setTokensLoading(false);
    };
    getTokens();
  }, []);

  const currentStep = useMemo(
    () =>
      [
        {
          component: (
            <TokenList
              onSelectedToken={handleSelectedToken}
              tokens={tokens}
              loading={tokensLoading}
            />
          ),
          header: (
            <Header
              center={
                <Text style={styles.title} type="subtitle3">
                  {t('addToken.title')}
                </Text>
              }
            />
          ),
          center: t('addToken.title'),
          adjustModalContent: false,
          fullHeight: true,
        },
        {
          component: (
            <ReviewToken token={selectedToken} onClose={handleClose} />
          ),
          header: (
            <Header
              left={
                <ActionButton
                  onPress={() => handleChangeStep(0)}
                  label={t('common.back')}
                />
              }
              right={
                <ActionButton onPress={handleClose} label={t('common.close')} />
              }
              center={
                <Text style={styles.title} type="subtitle3">
                  {t('addToken.reviewTitle')}
                </Text>
              }
            />
          ),
          adjustModalContent: true,
        },
      ][step],
    [step, tokens, selectedToken, tokensLoading]
  );

  return { currentStep, setStep };
};

const styles = StyleSheet.create({
  title: {
    color: Colors.White.Primary,
  },
});

export default useSteps;
