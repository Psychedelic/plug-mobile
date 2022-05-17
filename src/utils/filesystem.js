import { Share } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';

import { getAbsoluteType } from '@/utils/fileTypes';
import { deleteWhiteSpaces } from '@/utils/strings';

export const downloadFile = ({
  name,
  url,
  type,
  onFetched,
  onSuccess,
  onError,
}) => {
  try {
    const dirToSave = Dirs.CacheDir;
    const path = `${dirToSave}/NFT_${deleteWhiteSpaces(name)}${getAbsoluteType(
      type,
    )}`;

    FileSystem.fetch(url, {
      method: 'GET',
      path,
    }).then(() => {
      onFetched?.();
      Share.share({ url: path, title: name })
        .then(() => onSuccess?.())
        .catch(() => onError?.());
    });
  } catch (e) {
    onError?.();
    console.log(`Error at downloadFile | type: ${type} | error: ${e}`);
  }
};
