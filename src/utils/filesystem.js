import { Share } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';

export const downloadFile = ({
  filename,
  url,
  type,
  onFetched,
  onSuccess,
  onError,
}) => {
  try {
    const dirToSave = Dirs.CacheDir;
    const path = `${dirToSave}/${filename}`;

    FileSystem.fetch(url, {
      method: 'GET',
      path,
    }).then(() => {
      onFetched?.();
      Share.share({ url: path, title: filename })
        .then(() => onSuccess?.())
        .catch(() => onError?.());
    });
  } catch (e) {
    onError?.();
    console.log(`Error at downloadFile | type: ${type} | error: ${e}`);
  }
};
