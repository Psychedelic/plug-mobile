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
    setTokenAmount(amount);
    setUsdAmount(`${amount ? amount * tokenPrice : 0}`);
  };

  const handleSetUsdAmount = amount => {
    setUsdAmount(amount);
    setTokenAmount(`${amount ? amount / tokenPrice : 0}`);
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
        value={tokenAmount}
        onChange={handleSetTokenAmount}
        maxAmount={availableAmount}
        selected={selectedInput === selectedToken.symbol}
        setSelected={setSelectedInput}
        symbol={selectedToken.symbol}
        customStyle={{ marginBottom: 25, marginTop: 25 }}
      />
      <AmountInput
        value={usdAmount}
        onChange={handleSetUsdAmount}
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
