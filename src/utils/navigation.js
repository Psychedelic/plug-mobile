import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
  useNavigation as oldUseNavigation,
} from '@react-navigation/native';
import { Value } from 'react-native-reanimated';
import { useCallbackOne } from 'use-memo-one';

import { NATIVE_ROUTES } from '@/navigation/Routes';

export let TopLevelNavigationRef = createNavigationContainerRef();
const transitionPosition = new Value(0);
const poppingCounter = { isClosing: false, pendingActions: [] };

let blocked = false;
let timeout = null;

export function addActionAfterClosingSheet(action) {
  if (poppingCounter.isClosing) {
    poppingCounter.pendingActions.push(action);
  } else {
    action();
  }
}

export function useNavigation() {
  const { navigate: oldNavigate, ...rest } = oldUseNavigation();

  const handleNavigate = useCallbackOne(
    (...args) => navigate(oldNavigate, ...args),
    [oldNavigate],
  );

  return {
    navigate: handleNavigate,
    ...rest,
  };
}

function block() {
  blocked = true;
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  setTimeout(() => (blocked = false), 200);
}

/**
 * With this wrapper we allow to delay pushing of native
 * screen with delay when there's a closing transaction in progress
 * Also, we take care to hide discover sheet if needed
 */
export function navigate(oldNavigate, ...args) {
  if (typeof args[0] === 'string') {
    if (NATIVE_ROUTES.indexOf(args[0]) !== -1) {
      let wasBlocked = blocked;
      block();
      if (wasBlocked) {
        return;
      }
    }
    addActionAfterClosingSheet(() => oldNavigate(...args));
  } else {
    oldNavigate(...args);
  }
}

export function getActiveRoute() {
  return TopLevelNavigationRef?.getCurrentRoute();
}

/**
 * Handle a navigation action or queue the action if navigation actions have been paused.
 * @param  {Object} action      The navigation action to run.
 */
function handleAction(name, params, replace = false) {
  if (!TopLevelNavigationRef) {
    return;
  }
  const action = (replace ? StackActions.replace : CommonActions.navigate)(
    name,
    params,
  );
  TopLevelNavigationRef?.dispatch(action);
}

export default {
  getActiveRoute,
  handleAction,
  transitionPosition,
  TopLevelNavigationRef,
};
