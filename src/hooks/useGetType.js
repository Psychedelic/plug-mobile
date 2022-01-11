import { useEffect } from 'react';

function useGetType(url, setType) {
  useEffect(() => {
    const getType = async () =>
      await fetch(url).then(res => setType(res.headers.get('Content-Type')));
    if (url) {
      getType();
    }
    return () => setType(null);
  }, [url]);
}

export default useGetType;
