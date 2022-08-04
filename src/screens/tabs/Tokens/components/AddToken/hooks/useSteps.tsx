import { t } from 'i18next';
import React, { useMemo, useState } from 'react';

import { DABToken } from '@/interfaces/dab';

import { ReviewToken } from '../steps/ReviewToken';
import { TokenList } from '../steps/TokenList';

const useSteps = () => {
  const [step, setStep] = useState<number>(0);

  const [selectedToken, setSelectedToken] = useState<DABToken>();

  const handleSelectedToken = (token: DABToken) => () => {
    setSelectedToken(token);
    setStep(1);
  };

  // const handleChangeStep = (index: number) => setStep(index);
  // const handleClose = () => {};

  // const leftButton = onClick => (
  //   <LinkButton
  //     value={t('common.back')}
  //     onClick={onClick}
  //     startIcon={BackIcon}
  //   />
  // );
  // const rightButton = (
  //   <LinkButton value={t('common.close')} onClick={() => handleClose()} />
  // );

  const currentStep = useMemo(
    () =>
      [
        {
          component: <TokenList onSelectedToken={handleSelectedToken} />,
          // left: leftButton(() => handleClose()),
          // right: rightButton,
          center: t('addToken.title'),
        },
        {
          component: <ReviewToken token={selectedToken} />,
          // left: leftButton(() => handleChangeStep(0)),
          // right: rightButton,
          center: t('addToken.title'),
        },
      ][step],
    [step]
  );

  return currentStep;
};

export default useSteps;
