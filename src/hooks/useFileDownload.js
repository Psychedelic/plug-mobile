import { useEffect, useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';

function useFileDownload(uri) {
  const [path, setPath] = useState(null);
  useEffect(() => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp4',
    })
      .fetch('GET', uri)
      .then(res => {
        setPath(res.path());
      });
  }, []);

  if (path) {
    return path;
  }
}

export default useFileDownload;
