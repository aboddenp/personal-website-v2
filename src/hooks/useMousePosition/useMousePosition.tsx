'use client';
import { useMotionValue } from 'motion/react';
import * as React from 'react';

const INIT = -1000;

function useMousePosition() {
  const x = useMotionValue(INIT);
  const y = useMotionValue(INIT);
  const initiated = React.useRef<boolean>(false);

  function isOutOfBounds() {
    return x.get() < 0 || y.get() < 0;
  }

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (initiated.current == false) initiated.current = true;
      x.set(e.clientX);
      y.set(e.clientY);
    }

    window.addEventListener('mousemove', (e) => handleMouseMove(e));

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { x, y, isOutOfBounds, initiated };
}

export default useMousePosition;
