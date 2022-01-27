import React, { useState } from 'react';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import TokenSelector from '../../../../components/tokens/TokenSelector';
import AmountInput from '../../../../components/common/AmountInput';
import { formatSendAmount } from '../../utils';
import styles from './styles';

const USD_MAX_DECIMALS = 2;
const ICP_MAX_DECIMALS = 8;

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
      Number(`${formattedAmount ? formattedAmount * tokenPrice : 0}`).toFixed(
        USD_MAX_DECIMALS,
      ),
    );
  };

  const handleSetUsdAmount = amount => {
    const formattedAmount = formatSendAmount(amount, USD_MAX_DECIMALS);
    setUsdAmount(formattedAmount);
    setTokenAmount(
      Number(`${formattedAmount ? formattedAmount / tokenPrice : 0}`).toFixed(
        ICP_MAX_DECIMALS,
      ),
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
        customStyle={styles.firstInput}
      />
      <AmountInput
        autoFocus
        value={usdAmount}
        onChange={handleSetUsdAmount}
        maxAmount={availableUsdAmount}
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
