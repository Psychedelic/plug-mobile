import { useEffect } from 'react';

function useGetType(url, setType) {
  useEffect(() => {
    const getType = async () =>
      await fetch(url).then(res => setType(res.headers.get('Content-Type')));
    getType();
    return () => setType(null);
  }, [url]);
}

export default useGetType;
