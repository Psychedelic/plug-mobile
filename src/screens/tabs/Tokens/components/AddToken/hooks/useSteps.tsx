import { t } from 'i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ActionButton from '@/components/common/ActionButton';
import { DABToken } from '@/interfaces/dab';
import { getDabTokens } from '@/services/DAB';

import { ReviewToken } from '../steps/ReviewToken';
import { TokenList } from '../steps/TokenList';

interface Return {
  currentStep: {
    component: React.ReactNode;
    center?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    adjustModalContent?: boolean;
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
  const [selectedToken, setSelectedToken] = useState<DABToken>();

  const handleSelectedToken = useCallback((token: DABToken) => {
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
          center: t('addToken.title'),
          adjustModalContent: false,
        },
        {
          component: <ReviewToken token={selectedToken} />,
          left: (
            <ActionButton
              onPress={() => handleChangeStep(0)}
              label={t('common.back')}
            />
          ),
          right: (
            <ActionButton onPress={handleClose} label={t('common.close')} />
          ),
          center: t('addToken.reviewTitle'),
          adjustModalContent: true,
        },
      ][step],
    [step, tokens, selectedToken, tokensLoading]
  );

  return { currentStep, setStep };
};

export default useSteps;
