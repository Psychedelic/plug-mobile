import { useEffect, useState } from 'react';

import { TOKENS } from '@/constants/assets';
import { resolveName } from '@/services/ICNS';
import { validateICNSName } from '@/utils/ids';

import useDebounceValue from './useDebounceValue';

export default function useICNS(
  address?: string,
  symbol?: string,
  delay = 300
) {
  const debouncedAddress = useDebounceValue(address, delay);
  const [resolvedAddress, setResolvedAddress] = useState<string>();
  const [loading, setLoading] = useState(false);
  const isICP = symbol === TOKENS.ICP.symbol;

  useEffect(() => {
    if (address && debouncedAddress === address && validateICNSName(address)) {
      setLoading(true);
      resolveName(debouncedAddress, isICP)
        .then(response => {
          setResolvedAddress(response);
          setLoading(false);
        })
        .catch(err => {
          setResolvedAddress(undefined);
          setLoading(false);
          console.warn(err);
        });
    }
    if (!address || !validateICNSName(address)) {
      setResolvedAddress(undefined);
    }
  }, [debouncedAddress, symbol, address]);

  return {
    loading,
    address,
    resolvedAddress,
    isValid: !!resolvedAddress,
  };
}
