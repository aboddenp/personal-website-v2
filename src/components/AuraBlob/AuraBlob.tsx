'use client';
import * as React from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import styles from './AuraBlob.module.css';
import useMousePosition from '@/hooks/useMousePosition';
import UseWindowSize from '@/hooks/useWindowSize';

const SPRING = { stiffness: 150, damping: 80, type: 'spring' };
const INTIAL_POSITION = { x: 700, y: 300 };

function AuraBlob() {
  const { x: posX, y: posY } = useMousePosition();
  const [width, height] = UseWindowSize();

  const x = useSpring(posX, SPRING);
  const y = useSpring(posY, SPRING);

  const invertedX = useTransform(x, (v) => (v >= 0 ? width.get() - v : INTIAL_POSITION.x));
  const invertedY = useTransform(y, (v) => (v >= 0 ? height.get() - v : INTIAL_POSITION.y));

  const autoX = useSpring(INTIAL_POSITION.x, SPRING);
  const autoY = useSpring(INTIAL_POSITION.y, SPRING);

  const [isAutomatic, setIsAutomatic] = React.useState<boolean>(true);

  const autoTimerId = React.useRef<number | null>(null);
  const autoIntervalId = React.useRef<number | null>(null);
  const degree = React.useRef<number>(0);
  const radius = 200;

  function degToRad(deg: number) {
    return deg * (Math.PI / 180);
  }

  // --- Reset state whenever mouse moves ---
  React.useEffect(() => {
    if (autoTimerId.current) {
      clearTimeout(autoTimerId.current);
      autoTimerId.current = null;
    }
    if (autoIntervalId.current) {
      cancelAnimationFrame(autoIntervalId.current);
      autoIntervalId.current = null;
    }

    setIsAutomatic(false);
    degree.current = 0;

    // Start idle timer (separate effect will catch it)
    autoTimerId.current = window.setTimeout(() => {
      setIsAutomatic(true);
    }, 2000);

    return () => {
      if (autoTimerId.current) {
        clearTimeout(autoTimerId.current);
        autoTimerId.current = null;
      }
    };
  }, [posX, posY]); // run whenever mouse moves

  // --- Run automatic animation when active ---
  React.useEffect(() => {
    if (!isAutomatic) return;

    const step = () => {
      degree.current = (degree.current + 0.2) % 360;
      const circlePositionX = Math.floor(radius * Math.cos(degToRad(degree.current)));
      const circlePositionY = Math.floor(radius * Math.sin(degToRad(degree.current)));
      autoX.set(invertedX.get() - radius + circlePositionX);
      autoY.set(invertedY.get() - radius + circlePositionY);
      autoIntervalId.current = requestAnimationFrame(step);
    };

    autoIntervalId.current = requestAnimationFrame(step);

    return () => {
      if (autoIntervalId.current) {
        cancelAnimationFrame(autoIntervalId.current);
        autoIntervalId.current = null;
      }
    };
  }, [isAutomatic]);

  // --- Cleanup on unmount ---
  React.useEffect(() => {
    return () => {
      if (autoTimerId.current) clearTimeout(autoTimerId.current);
      if (autoIntervalId.current) cancelAnimationFrame(autoIntervalId.current);
    };
  }, []);

  return (
    <motion.div
      style={{ x: isAutomatic ? autoX : invertedX, y: isAutomatic ? autoY : invertedY }}
      className={`${styles.blobWrapper}`}
    >
      <div className={`${styles.blob}`}></div>
    </motion.div>
  );
}

export default AuraBlob;
