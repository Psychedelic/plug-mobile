export const FILE_TYPES = {
  SVG: '.svg',
  JPG: '.jpg',
  JPEG: '.jpeg',
  PNG: '.png',
  HTML: '.html',
  MP4: '.mp4',
};

export const getAbsoluteType = (type?: string) => {
  if (!type) {
    return '';
  }

  switch (true) {
    case type.includes('svg'):
      return FILE_TYPES.SVG;
    case type.includes('jpg'):
      return FILE_TYPES.JPG;
    case type.includes('jpeg'):
      return FILE_TYPES.JPEG;
    case type.includes('png'):
      return FILE_TYPES.PNG;
    case type.includes('html'):
      return FILE_TYPES.HTML;
    case type.includes('mp4'):
      return FILE_TYPES.MP4;
  }
};

/**
 * Function that returns the file type of a given url or file type
 * @param value URL or file type
 * @returns "html" | "image" | "video" | undefined
 */
export const getType = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  if (value.includes('html')) {
    return 'html';
  } else if (/\.(svg)$/i.test(value) || value.includes('image/svg+xml')) {
    return 'svg';
  } else if (
    /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value) ||
    value.includes('image')
  ) {
    return 'image';
  } else if (/\.(mp4)$/i.test(value) || value.includes('video')) {
    return 'video';
  }
  return undefined;
};
