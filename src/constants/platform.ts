import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const withNotch = DeviceInfo.hasNotch();

const IOS_STATUS_BAR_HEIGHT = 20;
export const NATIVE_BAR_CURRENT_HEIGHT = StatusBar.currentHeight || 0;
export const STATUS_BAR_HEIGHT = isIos
  ? IOS_STATUS_BAR_HEIGHT
  : NATIVE_BAR_CURRENT_HEIGHT;
export const STATUS_BAR_IS_FIXED = isAndroid && Platform.Version < 21;
export const ACTION_BAR_HEIGHT = STATUS_BAR_IS_FIXED ? 74 : 64;

const windowDimensions = Dimensions.get('window');
export const WINDOW_HEIGHT = windowDimensions.height;
export const WINDOW_WIDTH = windowDimensions.width;

export const IS_SMALL_DEVICE = WINDOW_WIDTH <= 320 && WINDOW_HEIGHT <= 568;
export const IS_MEDIUM_DEVICE =
  !IS_SMALL_DEVICE && WINDOW_WIDTH <= 360 && WINDOW_HEIGHT < 640;

export const REFERENCE_WIDTH = 380;
export const REFERENCE_HEIGHT = 650;
const USE_WIDTH =
  WINDOW_WIDTH / REFERENCE_WIDTH < WINDOW_HEIGHT / REFERENCE_HEIGHT;
export const REF_RATIO = USE_WIDTH
  ? WINDOW_WIDTH / REFERENCE_WIDTH
  : WINDOW_HEIGHT / REFERENCE_HEIGHT;

export const refRatioScale = (value: number) => value * REF_RATIO;

export const pixelRatioScale = (value: number) => value * PixelRatio.get();
