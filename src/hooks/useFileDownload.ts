import { useEffect, useState } from 'react';
import { Dirs, FileSystem } from 'react-native-file-access';

interface Props {
  url: string;
  format: string;
  filename?: string;
}

function useFileDownload({ url, format, filename }: Props) {
  const [path, setPath] = useState<string>();

  useEffect(() => {
    const title = filename || new Date().getTime();
    const newPath = `${Dirs.CacheDir}/${title}.${format}`;

    FileSystem.exists(`${Dirs.CacheDir}/${title}.${format}`).then(exists => {
      if (exists) {
        setPath(newPath);
      } else {
        // Download and save the file in the cache directory
        FileSystem.fetch(url, {
          method: 'GET',
          path: newPath,
        }).then(() => {
          setPath(newPath);
        });
      }
    });
  }, []);

  return path;
}

export default useFileDownload;
