import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';

export enum Events {
  CLOSE_ALL_MODALS = 'closeAllModals',
}

const nativeEvent = new NativeEventEmitter();

export const emmitEvent = (event: Events) => nativeEvent.emit(event);

export const addEventListener = (
  event: Events,
  listener: (data: any) => void
) => DeviceEventEmitter.addListener(event, listener);
