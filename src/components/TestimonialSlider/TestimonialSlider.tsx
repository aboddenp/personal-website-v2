'use client';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './testimonialSlider.module.css';
import useMousePosition from '@/hooks/useMousePosition';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMotionValueEvent, useMotionValue } from 'motion/react';

function TestimonialSlider({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true }, []);
  const { x, y } = useMousePosition();
  const wrapper = React.useRef<HTMLDivElement>(null);

  // Local state for values we need to re-render on change
  const [cursorState, setCursorState] = React.useState({
    x: -1,
    y: -1,
    within: false,
    next: false,
  });

  useMotionValueEvent(x, 'change', (latestX) => {
    const latestY = y.get();
    const bounds = wrapper.current?.getBoundingClientRect() ?? { left: 0, right: 0, top: 0, bottom: 0 };
    const wrapperWidth = wrapper.current?.clientWidth ?? 0;
    const withinX = latestX <= bounds.right && latestX >= bounds.left;
    const withinY = latestY <= bounds.bottom && latestY >= bounds.top;
    setCursorState({
      x: latestX,
      y: latestY,
      within: withinX && withinY,
      next: latestX >= bounds.right - wrapperWidth / 2,
    });
  });

  useMotionValueEvent(y, 'change', (latestY) => {
    const latestX = x.get();
    const bounds = wrapper.current?.getBoundingClientRect() ?? { left: 0, right: 0, top: 0, bottom: 0 };
    const wrapperWidth = wrapper.current?.clientWidth ?? 0;
    const withinX = latestX <= bounds.right && latestX >= bounds.left;
    const withinY = latestY <= bounds.bottom && latestY >= bounds.top;
    setCursorState({
      x: latestX,
      y: latestY,
      within: withinX && withinY,
      next: latestX >= bounds.right - wrapperWidth / 2,
    });
  });

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Re-check bounds on scroll (without needing mouse to move)
  React.useEffect(() => {
    function handleScroll() {
      const latestX = x.get();
      const latestY = y.get();
      const bounds = wrapper.current?.getBoundingClientRect() ?? { left: 0, right: 0, top: 0, bottom: 0 };
      const wrapperWidth = wrapper.current?.clientWidth ?? 0;
      const withinX = latestX <= bounds.right && latestX >= bounds.left;
      const withinY = latestY <= bounds.bottom && latestY >= bounds.top;
      setCursorState((prev) => ({
        ...prev,
        within: withinX && withinY,
        next: latestX >= bounds.right - wrapperWidth / 2,
      }));
    }

    window.addEventListener('scroll', handleScroll, { capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, [x, y]);

  return (
    <>
      <div className={styles.testimonialWrapper}>
        <div ref={wrapper} className={styles.embla}>
          <div className={styles.emblaViewPort} ref={emblaRef}>
            <div className={styles.emblaContainer}>{children}</div>
          </div>
        </div>
      </div>
      <button
        style={{
          top: cursorState.y,
          left: cursorState.x,
          display: cursorState.within ? 'grid' : 'none',
        }}
        className={styles.customCursor}
        onClick={() => (cursorState.next ? scrollNext() : scrollPrev())}
      >
        {cursorState.next ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </>
  );
}

export default TestimonialSlider;
