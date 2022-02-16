import React, { useState } from 'react';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import TokenSelector from '../../../../components/tokens/TokenSelector';
import AmountInput from '../../../../components/common/AmountInput';
import styles from './styles';
import {
  formatSendAmount,
  ICP_MAX_DECIMALS,
  USD_MAX_DECIMALS,
} from '../../utils';

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
  const [selectedInput, setSelectedInput] = useState('USD');

  const handleSetTokenAmount = amount => {
    // TODO: Set the correct MAX decimals for the selected token.
    const formattedAmount = formatSendAmount(amount, ICP_MAX_DECIMALS);
    setTokenAmount(formattedAmount);
    setUsdAmount(
      amount
        ? Number(formattedAmount * tokenPrice).toFixed(USD_MAX_DECIMALS)
        : null,
    );
  };

  const handleSetUsdAmount = amount => {
    const formattedAmount = formatSendAmount(amount, USD_MAX_DECIMALS);
    setUsdAmount(formattedAmount);
    setTokenAmount(
      amount
        ? Number(formattedAmount / tokenPrice).toFixed(ICP_MAX_DECIMALS)
        : null,
    );
  };

  const onTokenChange = () => {
    setTokenAmount(null);
    setUsdAmount(null);
    setSelectedToken(null);
  };

  const getButtonText = () => {
    if (!tokenAmount || !usdAmount) {
      return 'Enter an Amount';
    }
    if (availableUsdAmount < usdAmount || availableAmount < tokenAmount) {
      return 'Insufficient Funds';
    }
    return 'Review Send';
  };

  const isButtonDisabled = () =>
    !tokenAmount ||
    tokenAmount <= 0 ||
    !usdAmount ||
    usdAmount <= 0 ||
    usdAmount > availableUsdAmount ||
    tokenAmount > availableAmount;

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
