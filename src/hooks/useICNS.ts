import { useEffect, useState } from 'react';

import { TOKENS } from '@/constants/assets';
import { resolveName } from '@/services/ICNS';
import { isICNSName } from '@/utils/ids';

import useDebounceValue from './useDebounceValue';

export default function useICNS(address: string, symbol: string, delay = 300) {
  const debouncedAddress = useDebounceValue(address, delay);
  const [resolvedAddress, setResolvedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const isICP = symbol === TOKENS.ICP.symbol;

  useEffect(() => {
    if (debouncedAddress === address && isICNSName(address)) {
      setLoading(true);
      resolveName(debouncedAddress, isICP)
        .then(response => {
          setResolvedAddress(response);
          setLoading(false);
        })
        .catch(err => {
          setResolvedAddress(null);
          console.warn(err);
        });
    }
    if (!isICNSName(address)) {
      setResolvedAddress(null);
    }
  }, [debouncedAddress, symbol, address]);

  return {
    loading,
    resolvedAddress,
    isValid: !!resolvedAddress,
  };
}
