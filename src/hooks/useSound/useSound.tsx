'use client';
import * as React from 'react';
import { Howl } from 'howler';
import useThrottledFunction from '../useThrottle';

function useSound(src: string | string[], throttleAmount: number = 1000) {
  const HowlRef = React.useRef<null | Howl>(null);
  // stable dependency key so array sources don't recreate the Howl every render
  const srcKey = Array.isArray(src) ? src.join('|') : src;

  function play() {
    const howl = HowlRef.current;
    if (!howl) return;
    // with preload: false, play() only queues until load() is called explicitly
    if (howl.state() === 'unloaded') {
      howl.load();
    }
    if (!howl.playing()) {
      howl.play();
    }
  }

  const debouncedPlay = useThrottledFunction(play, throttleAmount);

  React.useEffect(() => {
    // preload: false keeps sound files off the initial page load; Howler fetches on first play()
    HowlRef.current = new Howl({ src: srcKey.split('|'), preload: false });
    return () => {
      HowlRef.current?.unload();
      HowlRef.current = null;
    };
  }, [srcKey]);

  return debouncedPlay;
}

export default useSound;
