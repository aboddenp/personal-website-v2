'use client';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './testimonialSlider.module.css';
import useMousePosition from '@/hooks/useMousePosition';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useMotionValue, useMotionValueEvent } from 'motion/react';

function TestimonialSlider({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true }, []);
  const { x, y } = useMousePosition();
  const wrapper = React.useRef<HTMLDivElement>(null);
  // Bounds are viewport-relative (like clientX/Y) so the cache must be refreshed on scroll/resize
  const bounds = React.useRef<DOMRect | null>(null);

  // Motion values move the cursor via transforms outside React — no re-render per mouse move
  const cursorX = useMotionValue(-1);
  const cursorY = useMotionValue(-1);

  // State only for the booleans that change what is rendered
  const [cursorState, setCursorState] = React.useState({ within: false, next: false });

  const updateCursor = React.useCallback(() => {
    if (!bounds.current) bounds.current = wrapper.current?.getBoundingClientRect() ?? null;
    const rect = bounds.current;
    if (!rect) return;
    const latestX = x.get();
    const latestY = y.get();
    cursorX.set(latestX);
    cursorY.set(latestY);
    const within = latestX <= rect.right && latestX >= rect.left && latestY <= rect.bottom && latestY >= rect.top;
    const next = latestX >= rect.right - rect.width / 2;
    setCursorState((prev) => (prev.within === within && prev.next === next ? prev : { within, next }));
  }, [x, y, cursorX, cursorY]);

  useMotionValueEvent(x, 'change', updateCursor);
  useMotionValueEvent(y, 'change', updateCursor);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Re-check bounds on scroll/resize (without needing mouse to move)
  React.useEffect(() => {
    function refresh() {
      bounds.current = wrapper.current?.getBoundingClientRect() ?? null;
      updateCursor();
    }

    window.addEventListener('scroll', refresh, { capture: true });
    window.addEventListener('resize', refresh);
    return () => {
      window.removeEventListener('scroll', refresh, { capture: true });
      window.removeEventListener('resize', refresh);
    };
  }, [updateCursor]);

  return (
    <>
      <div className={styles.testimonialWrapper}>
        <div ref={wrapper} className={styles.embla}>
          <div className={styles.emblaViewPort} ref={emblaRef}>
            <div className={styles.emblaContainer}>{children}</div>
          </div>
        </div>
      </div>
      <motion.button
        type="button"
        aria-label={cursorState.next ? 'Next testimonial' : 'Previous testimonial'}
        style={{
          x: cursorX,
          y: cursorY,
          display: cursorState.within ? 'grid' : 'none',
        }}
        transformTemplate={(_, generated) => `${generated} translate(-50%, -50%)`}
        className={styles.customCursor}
        onClick={() => (cursorState.next ? scrollNext() : scrollPrev())}
      >
        {cursorState.next ? <ChevronRight /> : <ChevronLeft />}
      </motion.button>
    </>
  );
}

export default TestimonialSlider;
