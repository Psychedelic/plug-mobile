import React, { useState } from 'react';

import RainbowButton from '../../../components/buttons/RainbowButton';
import TokenSelector from '../../../components/tokens/TokenSelector';
import AmountInput from '../../../components/common/AmountInput';

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
    setTokenAmount((amount ? Number(amount) : 0).toFixed?.(8));
    setUsdAmount((amount ? Number(amount) * tokenPrice : 0).toFixed(2));
  };

  const handleSetUsdAmount = amount => {
    setUsdAmount((amount ? Number(amount) : 0).toFixed?.(2));
    setTokenAmount((amount ? Number(amount) / tokenPrice : 0).toFixed(8));
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
    !usdAmount ||
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
        value={Number(tokenAmount).toFixed(8)}
        onChange={handleSetTokenAmount}
        maxAmount={availableAmount}
        selected={selectedInput === selectedToken.symbol}
        setSelected={setSelectedInput}
        symbol={selectedToken.symbol}
        formatValue={value => Number(value).toFixed(8)}
        customStyle={{ marginBottom: 25, marginTop: 25 }}
      />
      <AmountInput
        value={Number(usdAmount).toFixed(2)}
        onChange={handleSetUsdAmount}
        maxAmount={availableUsdAmount}
        selected={selectedInput === 'USD'}
        setSelected={setSelectedInput}
        symbol="USD"
        autoFocus
        formatValue={value => Number(value).toFixed(2)}
        customStyle={{ marginBottom: 25 }}
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
