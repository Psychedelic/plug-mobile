import React, { useState, useEffect } from 'react';
import TokenSelector from '../../../components/tokens/TokenSelector';
import RainbowButton from '../../../components/buttons/RainbowButton';
import AmountInput from '../../../components/common/AmountInput';

const AmountSection = ({
  selectedToken,
  setSelectedToken,
  onReview,
  tokenAmount,
  setTokenAmount,
  usdAmount,
  setUsdAmount,
}) => {
  const [selectedInput, setSelectedInput] = useState('USD');

  useEffect(() => {
    setTokenAmount(usdAmount ? String(usdAmount / selectedToken.value) : null);
  }, [usdAmount, selectedToken.value, setTokenAmount]);

  useEffect(() => {
    setUsdAmount(
      tokenAmount ? String(tokenAmount * selectedToken.value) : null,
    );
  }, [tokenAmount, selectedToken.value, setUsdAmount]);

  const onTokenChange = () => {
    setSelectedToken(null);
  };

  const usdValue = selectedToken.value * selectedToken.amount;

  const getButtonText = () => {
    if (!tokenAmount || !usdAmount) {
      return 'Enter an Amount';
    }
    if (usdValue < usdAmount || selectedToken.amount < tokenAmount) {
      return 'Insufficient Funds';
    }
    return 'Review Send';
  };

  const isButtonDisabled = () =>
    !tokenAmount ||
    !usdAmount ||
    usdAmount > usdValue ||
    tokenAmount > selectedToken.amount;

  return (
    <>
      <TokenSelector
        {...selectedToken}
        onPress={onTokenChange}
        usdValue={selectedInput === 'USD' ? usdValue : null}
      />

      <AmountInput
        value={tokenAmount}
        onChange={setTokenAmount}
        maxAmount={selectedToken.amount}
        selected={selectedInput === selectedToken.symbol}
        setSelected={setSelectedInput}
        symbol={selectedToken.symbol}
        customStyle={{ marginBottom: 25, marginTop: 25 }}
      />

      <AmountInput
        value={usdAmount}
        onChange={setUsdAmount}
        maxAmount={selectedToken.value * selectedToken.amount}
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
