import { useEffect, useState } from 'react';
import { Dirs, FileSystem } from 'react-native-file-access';

function useFileDownload({ url, format }) {
  const [path, setPath] = useState(null);

  useEffect(() => {
    const randomTitle = new Date().getTime();

    // Saves the file in the cache
    const newPath = `${Dirs.CacheDir}/${randomTitle}.${format}`;
    FileSystem.fetch(url, {
      method: 'GET',
      path: newPath,
    }).then(() => {
      setPath(newPath);
    });
  }, []);

  if (path) {
    return path;
  }
}

export default useFileDownload;
