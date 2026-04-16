import { useMotionValue } from 'motion/react';
import React from 'react';

export default function UseWindowSize() {
  const width = useMotionValue(0);
  const height = useMotionValue(0);

  React.useEffect(() => {
    const updateSize = () => {
      width.set(window.innerWidth);
      height.set(window.innerHeight);
    };

    updateSize(); // set initial value

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return [width, height];
}
