'use client';
import * as React from 'react';

function useMousePosition() {
  const [x, setX] = React.useState<number>(-100);
  const [y, setY] = React.useState<number>(-100);
  const debounceTime = React.useRef(Date.now());
  const debounceThreshold = 10;

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const newDebounceTime = Date.now();
      const timeDifference = newDebounceTime - debounceTime.current;
      if (timeDifference > debounceThreshold) {
        setX(e.clientX);
        setY(e.clientY);
        debounceTime.current = newDebounceTime;
      } else {
        console.log('skipped frames');
      }
    }

    window.addEventListener('mousemove', (e) => handleMouseMove(e));

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { x, y };
}

export default useMousePosition;
