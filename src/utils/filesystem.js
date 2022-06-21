import { Share } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';
import FileViewer from 'react-native-file-viewer';

import { isIos } from '@/constants/platform';

export const downloadFile = ({
  filename,
  url,
  onFetched,
  onSuccess,
  onError,
}) => {
  try {
    const dirToSave = Dirs.DocumentDir;
    const path = `${dirToSave}/${filename}`;

    FileSystem.fetch(url, {
      method: 'GET',
      path,
    }).then(res => {
      onFetched?.();
      if (res.ok) {
        FileViewer.open(path, {
          showOpenWithDialog: true,
          displayName: filename,
        }).then(() => {
          if (isIos) {
            Share.share({ url: path, title: filename });
          }
          onSuccess?.();
        });
      } else {
        onError?.();
      }
    });
  } catch (e) {
    onError?.();
  }
};
