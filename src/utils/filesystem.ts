import { PermissionsAndroid, Share } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';
import FileViewer from 'react-native-file-viewer';

import { isAndroid, isIos } from '@/constants/platform';

const requestStoragePermissions = async (
  onError?: () => void,
  onSuccess?: () => void
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      onSuccess?.();
    } else {
      onError?.();
    }
  } catch (err) {
    onError?.();
  }
};

interface DownloadFileProps {
  filename: string;
  url: string;
  onFetched: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export const downloadFile = async ({
  filename,
  url,
  onFetched,
  onSuccess,
  onError,
}: DownloadFileProps) => {
  try {
    if (isAndroid) {
      await requestStoragePermissions(onError);
    }
    const dirToSave = Dirs.DocumentDir;
    const path = `${dirToSave}/${filename}`;

    FileSystem.fetch(url, {
      method: 'GET',
      path,
    }).then(async res => {
      onFetched?.();
      if (isAndroid) {
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
