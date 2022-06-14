import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import RainbowButton from '@/components/buttons/RainbowButton';
import AmountInput from '@/components/common/AmountInput';
import TokenSelector from '@/components/tokens/TokenSelector';
import { VISIBLE_DECIMALS } from '@/constants/business';
import { parseLocaleNumber, toFixedLocale } from '@/utils/number';

import styles from './styles';

interface Props {
  selectedToken: {
    symbol: string;
    amount: number;
  };
  tokenAmount: {
    value: number;
    display: string;
  };
  usdAmount: {
    value: number;
    display: string;
  };
  tokenPrice: number;
  availableAmount: number;
  availableUsdAmount: number;
  setUsdAmount: (value: any) => void;
  setTokenAmount: (value: any) => void;
  setSelectedToken: (token: any) => void;
  onReview: () => void;
}

const AmountSection = ({
  selectedToken,
  setSelectedToken,
  tokenPrice,
  onReview,
  tokenAmount,
  setTokenAmount,
  usdAmount,
  setUsdAmount,
  availableAmount,
  availableUsdAmount,
}: Props) => {
  const { t } = useTranslation();
  const [selectedInput, setSelectedInput] = useState('USD');

  const handleSetTokenAmount = (amount: string) => {
    const formattedAmount = parseLocaleNumber(amount);

    setTokenAmount({
      value: formattedAmount,
      display: amount,
    });

    setUsdAmount(
      !isNaN(formattedAmount) && formattedAmount > 0
        ? {
            value: formattedAmount * tokenPrice,
            display: toFixedLocale(
              formattedAmount * tokenPrice,
              VISIBLE_DECIMALS
            ),
          }
        : null
    );
  };

  const handleSetUsdAmount = (amount: string) => {
    const formattedAmount = parseLocaleNumber(amount);
    setUsdAmount({
      value: formattedAmount,
      display: amount,
    });

    setTokenAmount(
      !isNaN(formattedAmount) && formattedAmount > 0
        ? {
            value: formattedAmount / tokenPrice,
            display: toFixedLocale(
              formattedAmount / tokenPrice,
              VISIBLE_DECIMALS
            ),
          }
        : null
    );
  };

  const handleMaxPress = () => {
    setTokenAmount({
      value: availableAmount,
      display: availableAmount.toFixed(VISIBLE_DECIMALS),
    });

    setUsdAmount(
      !isNaN(availableAmount) && availableAmount > 0
        ? {
            value: availableAmount * tokenPrice,
            display: toFixedLocale(
              availableAmount * tokenPrice,
              VISIBLE_DECIMALS
            ),
          }
        : null
    );
  };

  const onTokenChange = () => {
    setTokenAmount(null);
    setUsdAmount(null);
    setSelectedToken(null);
  };

  const getButtonText = () => {
    if (!tokenAmount || !usdAmount) {
      return t('send.enterAmount');
    }

    if (
      availableUsdAmount < usdAmount?.value ||
      availableAmount < tokenAmount?.value
    ) {
      return t('send.noFunds');
    }
    return t('send.reviewSend');
  };

  const isButtonDisabled = () =>
    !tokenAmount ||
    tokenAmount.value <= 0 ||
    !usdAmount ||
    usdAmount.value <= 0 ||
    usdAmount.value > availableUsdAmount ||
    tokenAmount.value > availableAmount;

  return (
    <>
      <TokenSelector
        {...selectedToken}
        onPress={onTokenChange}
        availableAmount={availableAmount}
        availableUsdAmount={availableUsdAmount}
        selectedInput={selectedInput}
        decimalScale={VISIBLE_DECIMALS}
      />
      <AmountInput
        autoFocus
        value={tokenAmount?.display}
        onChange={handleSetTokenAmount}
        onMaxPress={handleMaxPress}
        selected={selectedInput === selectedToken.symbol}
        setSelected={setSelectedInput}
        symbol={selectedToken.symbol}
        containerStyle={styles.firstInputContainer}
        inputStyle={styles.firstInput}
      />
      <AmountInput
        value={usdAmount?.display}
        onChange={handleSetUsdAmount}
        selected={selectedInput === 'USD'}
        setSelected={setSelectedInput}
        symbol="USD"
        containerStyle={styles.secondInputContainer}
      />
      <RainbowButton
        text={getButtonText()}
        onPress={onReview}
        disabled={isButtonDisabled()}
      />
    </>
  );
};

export default AmountSection;
