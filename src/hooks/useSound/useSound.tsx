'use client';
import * as React from 'react';
import { Howl } from 'howler';
import useThrottledFunction from '../useThrottle';

function useSound(src: string, throttleAmount: number = 1000) {
  const HowlRef = React.useRef<null | Howl>(null);

  function play() {
    if (HowlRef.current && !HowlRef.current.playing()) {
      HowlRef.current?.play();
    }
  }

  const debouncedPlay = useThrottledFunction(play, throttleAmount);

  function stop() {
    if (HowlRef.current) {
      HowlRef.current.stop();
    }
  }

  React.useEffect(() => {
    HowlRef.current = new Howl({ src });
    return () => {
      HowlRef.current?.unload();
      HowlRef.current = null;
    };
  }, []);

  return debouncedPlay;
}

export default useSound;
