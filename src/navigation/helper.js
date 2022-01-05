import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(route, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(route, params);
  }
}
