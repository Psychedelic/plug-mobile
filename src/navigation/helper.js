import { createRef } from 'react';

export const navigationRef = createRef();

export const getRoute = state => {
  const route = state.routes[state.index];
  return route.state ? getRoute(route.state) : route;
};

export const getActiveRoute = () =>
  getRoute(navigationRef.current.getRootState());

const useNavigation = () => navigationRef.current;
export default useNavigation;

export const navigateToRoute = route => () =>
  navigationRef.current?.navigate(route);
