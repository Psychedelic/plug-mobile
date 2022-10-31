import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

function useScrollHanlder() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleOnScroll = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    setScrollPosition(scrollEvent.nativeEvent.contentOffset.y);
  };

  return {
    scrollPosition,
    handleOnScroll,
  };
}

export default useScrollHanlder;
