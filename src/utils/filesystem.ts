import { Share } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';
import FileViewer from 'react-native-file-viewer';

import { isIos } from '@/constants/platform';

interface DownloadFileProps {
  filename: string;
  url: string;
  onFetched: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export const downloadFile = ({
  filename,
  url,
  onFetched,
  onSuccess,
  onError,
}: DownloadFileProps) => {
  try {
    const dirToSave = Dirs.DocumentDir;
    const path = `${dirToSave}/${filename}`;

    FileSystem.fetch(url, {
      method: 'GET',
      path,
    }).then(async res => {
      onFetched?.();
      if (!isIos) {
        await FileSystem.cpExternal(path, filename, 'downloads');
      }
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
