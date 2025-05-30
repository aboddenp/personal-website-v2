'use client';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './testimonialSlider.module.css';
import useMousePosition from '@/hooks/useMousePosition';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function TestimonialSlider({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true }, []);
  const { x, y } = useMousePosition();

  const wrapper = React.useRef<HTMLDivElement>(null);
  const wrapperWidth = wrapper.current?.clientWidth || 0;
  const wrapperBounds = wrapper.current?.getBoundingClientRect() || { left: 0, right: 0, bottom: 0, top: 0 };
  const wrapperMidPoint = wrapperWidth / 2;
  const withinX = x <= wrapperBounds.right && x >= wrapperBounds.left;
  const withinY = y <= wrapperBounds.bottom && y >= wrapperBounds.top;
  const within = withinX && withinY;

  const next = x >= wrapperBounds.right - wrapperMidPoint;

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) {
      console.log(emblaApi);
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) {
      console.log(emblaApi);
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <>
      <div className={styles.testimonialWrapper}>
        <div ref={wrapper} className={`${styles.embla}`}>
          <div className={`${styles.emblaViewPort}`} ref={emblaRef}>
            <div className={`${styles.emblaContainer}`}>{children}</div>
          </div>
        </div>
      </div>

      <button
        style={{ top: y, left: x, display: within ? 'grid' : 'none' }}
        className={styles.customCursor}
        onClick={() => {
          if (next) {
            scrollNext();
          } else {
            scrollPrev();
          }
        }}
      >
        {next ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </>
  );
}

export default TestimonialSlider;
