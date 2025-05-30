'use client';
import * as React from 'react';

function useTopScroll(): boolean {
  const [isTop, setIsTop] = React.useState(true);

  React.useEffect(() => {
    if (window.scrollY !== 0) {
      setIsTop(false);
    }
    function handleScroll() {
      if (window.scrollY == 0) {
        setIsTop(true);
      }
      if (window.scrollY != 0 && isTop) {
        setIsTop(false);
      }
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isTop;
}

export default useTopScroll;
