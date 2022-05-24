import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import RainbowButton from '@/components/buttons/RainbowButton';
import AmountInput from '@/components/common/AmountInput';
import TokenSelector from '@/components/tokens/TokenSelector';
import {
  formatSendAmount,
  ICP_MAX_DECIMALS,
  USD_MAX_DECIMALS,
} from '@/screens/flows/Send/utils';
import { toFixedNoRounding } from '@/utils/number';

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
  const newTokenAmount = Number(tokenAmount);
  const newUsdAmount = Number(usdAmount);
  const newAvailableUsdAmount = Number(availableUsdAmount);

  const handleSetTokenAmount = amount => {
    // TODO: Set the correct MAX decimals for the selected token.
    const formattedAmount = formatSendAmount(amount, ICP_MAX_DECIMALS);
    setTokenAmount(formattedAmount);
    setUsdAmount(
      amount
        ? toFixedNoRounding(formattedAmount * tokenPrice, USD_MAX_DECIMALS)
        : null
    );
  };

  const handleSetUsdAmount = amount => {
    const formattedAmount = formatSendAmount(amount, USD_MAX_DECIMALS);
    setUsdAmount(formattedAmount);
    setTokenAmount(
      amount
        ? toFixedNoRounding(formattedAmount / tokenPrice, ICP_MAX_DECIMALS)
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
        value={tokenAmount}
        onChange={handleSetTokenAmount}
        maxAmount={availableAmount}
        customPlaceholder="0.00000000"
        selected={selectedInput === selectedToken.symbol}
        setSelected={setSelectedInput}
        symbol={selectedToken.symbol}
        customStyle={styles.firstInput}
      />
      <AmountInput
        value={usdAmount}
        onChange={handleSetUsdAmount}
        selected={selectedInput === 'USD'}
        setSelected={setSelectedInput}
        symbol="USD"
        customStyle={styles.secondInput}
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
