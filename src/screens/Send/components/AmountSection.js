import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    setTokenAmount(usdAmount ? String(usdAmount / tokenPrice) : null);
  }, [usdAmount, tokenPrice, setTokenAmount]);

  useEffect(() => {
    setUsdAmount(tokenAmount ? String(tokenAmount * tokenPrice) : null);
  }, [tokenAmount, tokenPrice, setUsdAmount]);

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
        value={tokenAmount}
        onChange={setTokenAmount}
        maxAmount={availableAmount}
        selected={selectedInput === selectedToken.symbol}
        setSelected={setSelectedInput}
        symbol={selectedToken.symbol}
        customStyle={{ marginBottom: 25, marginTop: 25 }}
      />

      <AmountInput
        value={usdAmount}
        onChange={setUsdAmount}
        maxAmount={availableUsdAmount}
        selected={selectedInput === 'USD'}
        setSelected={setSelectedInput}
        symbol="USD"
        autoFocus
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
