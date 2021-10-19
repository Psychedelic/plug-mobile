import { keys, map } from 'lodash';
import reduceArrayToObject from './reduceArrayToObject';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const HapticFeedbackTypes = {
  selection: 'selection',
  impactLight: 'impactLight',
  impactMedium: 'impactMedium',
  impactHeavy: 'impactHeavy',
  notificationSuccess: 'notificationSucces',
  notificationWarning: 'notificationWarning',
  notificationError: 'notificationError',
};

const hapticToTrigger = haptic => ({
  [haptic]: () => ReactNativeHapticFeedback.trigger(haptic),
});

const haptics = reduceArrayToObject(
  map(keys(HapticFeedbackTypes), hapticToTrigger),
);

export default haptics;
