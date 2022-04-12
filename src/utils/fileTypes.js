export const FILE_TYPES = {
  SVG: '.svg',
  JPG: '.jpg',
  JPEG: '.jpeg',
  PNG: '.png',
  HTML: '.html',
  MP4: '.mp4',
};

export const getAbsoluteType = type => {
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
