import { useRef, useCallback } from 'react';

/**
 * Returns a throttled version of the function.
 * Executes immediately, then ignores calls for the specified delay.
 */
function useThrottledFunction<T extends (...args: any[]) => void>(fn: T, delay: number = 1000): T {
  const lastCallRef = useRef<number>(0);

  const throttledFn = useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        fn(...args);
      }
    }) as T,
    [fn, delay],
  );

  return throttledFn;
}

export default useThrottledFunction;
