import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import RainbowButton from '@/components/buttons/RainbowButton';
import AmountInput from '@/components/common/AmountInput';
import TokenSelector from '@/components/tokens/TokenSelector';
import {
  TOKEN_MAX_DECIMALS,
  USD_MAX_DECIMALS,
} from '@/screens/flows/Send/utils';
import { parseLocaleNumber, toFixedLocale } from '@/utils/number';

import styles from './styles';

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
}) => {
  const { t } = useTranslation();
  const [selectedInput, setSelectedInput] = useState('USD');
  const newTokenAmount = tokenAmount?.value;
  const newUsdAmount = usdAmount?.value;
  const newAvailableUsdAmount = Number(availableUsdAmount);

  const handleSetTokenAmount = amount => {
    // TODO: Set the correct MAX decimals for the selected token.
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
              USD_MAX_DECIMALS
            ),
          }
        : null
    );
  };

  const handleSetUsdAmount = amount => {
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
              TOKEN_MAX_DECIMALS
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
      newAvailableUsdAmount < newUsdAmount ||
      availableAmount < newTokenAmount
    ) {
      return t('send.noFunds');
    }
    return t('send.reviewSend');
  };

  const isButtonDisabled = () =>
    !newTokenAmount ||
    newTokenAmount <= 0 ||
    !newUsdAmount ||
    newUsdAmount <= 0 ||
    newUsdAmount > newAvailableUsdAmount ||
    newTokenAmount > availableAmount;

  return (
    <>
      <TokenSelector
        {...selectedToken}
        onPress={onTokenChange}
        availableAmount={availableAmount}
        availableUsdAmount={availableUsdAmount}
        selectedInput={selectedInput}
      />
      <AmountInput
        autoFocus
        value={tokenAmount?.display}
        onChange={handleSetTokenAmount}
        maxAmount={availableAmount}
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
