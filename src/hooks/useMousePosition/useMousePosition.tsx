'use client';
import { useMotionValue } from 'motion/react';
import * as React from 'react';

function useMousePosition() {
  const x = useMotionValue(-1);
  const y = useMotionValue(-1);
  const initiated = React.useRef<boolean>(false);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      y.set(e.clientY);
      x.set(e.clientX);
      initiated.current = true;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { x, y, initiated };
}

export default useMousePosition;
