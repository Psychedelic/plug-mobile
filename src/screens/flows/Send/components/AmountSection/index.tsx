import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import RainbowButton from '@/components/buttons/RainbowButton';
import { AmountInput, Text } from '@/components/common';
import Icon from '@/components/icons';
import TokenSelector from '@/components/tokens/TokenSelector';
import { VISIBLE_DECIMALS } from '@/constants/business';
import { Asset } from '@/interfaces/redux';
import { parseLocaleNumber, toFixedLocale } from '@/utils/number';

import { Amount } from '../../interfaces';
import styles, { iconColor } from './styles';

interface Props {
  selectedToken: Asset;
  tokenAmount?: Amount;
  usdAmount?: Amount;
  tokenPrice?: number;
  availableAmount: number;
  availableUsdAmount?: number;
  setUsdAmount: (value?: Amount) => void;
  setTokenAmount: (value?: Amount) => void;
  setSelectedToken: (token?: Asset) => void;
  onReview: () => void;
  disabledButton?: boolean;
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
  disabledButton,
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
      !isNaN(formattedAmount) && formattedAmount > 0 && tokenPrice
        ? {
            value: formattedAmount * tokenPrice,
            display: toFixedLocale(
              formattedAmount * tokenPrice,
              VISIBLE_DECIMALS
            ),
          }
        : undefined
    );
  };

  const handleSetUsdAmount = (amount: string) => {
    const formattedAmount = parseLocaleNumber(amount);
    setUsdAmount({
      value: formattedAmount,
      display: amount,
    });

    setTokenAmount(
      !isNaN(formattedAmount) && formattedAmount > 0 && tokenPrice
        ? {
            value: formattedAmount / tokenPrice,
            display: toFixedLocale(
              formattedAmount / tokenPrice,
              VISIBLE_DECIMALS
            ),
          }
        : undefined
    );
  };

  const handleMaxPress = () => {
    setTokenAmount({
      value: availableAmount,
      display: toFixedLocale(availableAmount, VISIBLE_DECIMALS),
    });

    setUsdAmount(
      !isNaN(availableAmount) && availableAmount > 0 && tokenPrice
        ? {
            value: availableAmount * tokenPrice,
            display: toFixedLocale(
              availableAmount * tokenPrice,
              VISIBLE_DECIMALS
            ),
          }
        : undefined
    );
  };

  const onTokenChange = () => {
    setTokenAmount(undefined);
    setUsdAmount(undefined);
    setSelectedToken(undefined);
  };

  const getButtonText = () => {
    if (!tokenAmount) {
      return t('send.enterAmount');
    }

    if (
      (availableUsdAmount &&
        usdAmount?.value &&
        availableUsdAmount < usdAmount.value) ||
      availableAmount < tokenAmount?.value
    ) {
      return t('send.noFunds');
    }
    return t('send.reviewSend');
  };

  const isButtonDisabled = () =>
    !tokenAmount ||
    tokenAmount.value <= 0 ||
    (availableUsdAmount &&
      usdAmount &&
      (usdAmount.value <= 0 || usdAmount.value > availableUsdAmount)) ||
    tokenAmount.value > availableAmount;

  return (
    <>
      <TokenSelector
        token={selectedToken}
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
      />
      <AmountInput
        value={usdAmount?.display}
        onChange={handleSetUsdAmount}
        selected={selectedInput === 'USD'}
        setSelected={setSelectedInput}
        symbol="USD"
        disabled={!tokenPrice}
      />
      {!tokenPrice ? (
        <View style={styles.captionContainer}>
          <Icon name="info" color={iconColor} />
          <Text type="caption" style={styles.captionText}>
            {t('send.noPriceAvailable', { token: selectedToken.name })}
          </Text>
        </View>
      ) : null}
      <RainbowButton
        buttonStyle={styles.button}
        text={getButtonText()}
        onPress={onReview}
        disabled={disabledButton || isButtonDisabled()}
      />
    </>
  );
};

export default AmountSection;
