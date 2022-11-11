import { PermissionsAndroid, Share } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';
import FileViewer from 'react-native-file-viewer';

import { isAndroid, isIos } from '@/constants/platform';

import { getExtension } from './fileTypes';

const requestStoragePermissions = async (
  onError?: () => void,
  onSuccess?: () => void
) => {
  try {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (hasPermission) {
      onSuccess?.();
    } else {
      const permissionRequest = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (permissionRequest === PermissionsAndroid.RESULTS.GRANTED) {
        onSuccess?.();
      } else {
        onError?.();
      }
    }
  } catch (err) {
    onError?.();
  }
};

interface DownloadFileProps {
  filename: string;
  url: string;
  mimeType: string;
  onFetched?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export const downloadFile = async ({
  filename,
  url,
  mimeType,
  onFetched,
  onSuccess,
  onError,
}: DownloadFileProps) => {
  try {
    if (isAndroid) {
      await requestStoragePermissions(onError);
    }
    const dirToSave = Dirs.DocumentDir;
    const extension = getExtension(mimeType);
    const path = `${dirToSave}/${filename}.${extension}`;

    FileSystem.fetch(url, {
      method: 'GET',
      path,
    }).then(async res => {
      onFetched?.();
      const nameWithExtension = `${filename}.${extension}`;
      if (isAndroid) {
        await FileSystem.cpExternal(path, nameWithExtension, 'downloads');
      }
      if (res.ok) {
        FileViewer.open(path, {
          showOpenWithDialog: true,
          displayName: nameWithExtension,
        }).then(() => {
          if (isIos) {
            Share.share({ url: path, title: nameWithExtension });
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
