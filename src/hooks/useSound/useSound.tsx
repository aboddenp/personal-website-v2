'use client';
import * as React from 'react';
import { Howl, Howler } from 'howler';
import useThrottledFunction from '../useThrottle';

function useSound(src: string, throttleAmount: number = 1000) {
  const HowlRef = React.useRef<null | Howl>(null);

  function play() {
    if (HowlRef.current) {
      console.log('should play sound');
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
    HowlRef.current = new Howl({
      src,
      html5: true,
    });
  }, []);

  return debouncedPlay;
}

export default useSound;
