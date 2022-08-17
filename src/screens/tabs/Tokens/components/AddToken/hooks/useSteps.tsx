import { t } from 'i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';

import ActionButton from '@/components/common/ActionButton';
import Alert from '@/components/common/Alert';
import DABLogo from '@/components/icons/svg/DAB.svg';
import { dabFormUrl } from '@/constants/urls';
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
    fullHeight?: boolean;
    floatingComponent?: React.ReactNode;
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

  const handleOpenDabForm = useCallback(() => {
    Linking.canOpenURL(dabFormUrl).then(() => Linking.openURL(dabFormUrl));
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
          // floatingComponent: (
          //   <Alert
          //     caption={t('addToken.dabCaption')}
          //     actionLabel={t('addToken.learnMore')}
          //     onActionPress={handleOpenDabForm}
          //     style={styles.alert}
          //     left={<DABLogo height={40} style={styles.icon} />}
          //   />
          // ),
          center: t('addToken.title'),
          adjustModalContent: false,
          fullHeight: true,
        },
        {
          component: (
            <ReviewToken token={selectedToken} onClose={handleClose} />
          ),
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

const styles = StyleSheet.create({
  alert: { margin: 16, zIndex: 1, position: 'absolute', bottom: 0 },
  icon: { marginRight: 16 },
});

export default useSteps;
