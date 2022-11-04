import { useEffect, useState } from 'react';

import { getType } from '@/utils/fileTypes';

function useGetType(url?: string) {
  const [type, setType] = useState<string>();
  useEffect(() => {
    const fetchType = async () =>
      await fetch(url!).then(res =>
        setType(getType(res.headers.get('Content-Type')))
      );

    if (url) {
      const fileType = getType(url);
      if (fileType) {
        setType(fileType);
      } else {
        fetchType();
      }
    }
  }, [url]);
  return type;
}

export default useGetType;
