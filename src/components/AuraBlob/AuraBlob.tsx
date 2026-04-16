'use client';
import * as React from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import styles from './AuraBlob.module.css';
import useMousePosition from '@/hooks/useMousePosition';
import UseWindowSize from '@/hooks/useWindowSize';

const SPRING = { stiffness: 150, damping: 80, type: 'spring' };

function AuraBlob() {
  const { x: posX, y: posY, initiated } = useMousePosition();
  const [width, height] = UseWindowSize();
  const [isMounted, setIsMounted] = React.useState(false);

  // Blob starts at viewport center, transitions to inverted mouse on first move
  const blobX = useMotionValue(0);
  const blobY = useMotionValue(0);

  const smoothX = useSpring(blobX, SPRING);
  const smoothY = useSpring(blobY, SPRING);

  React.useEffect(() => {
    smoothX.jump(window.innerWidth / 2);
    smoothY.jump(window.innerHeight / 2);
    blobX.jump(window.innerWidth / 2);
    blobY.jump(window.innerHeight / 2);

    setIsMounted(true);
  }, []);

  // Once mouse moves, keep blobX/Y in sync with inverted mouse position
  React.useEffect(() => {
    const unsub = posX.on('change', () => {
      if (!initiated.current) return;
      blobX.set(width.get() - posX.get());
      blobY.set(height.get() - posY.get());
    });
    return () => unsub();
  }, []);

  // --- Auto orbit (unchanged logic) ---
  const [isAutomatic, setIsAutomatic] = React.useState(false);
  const autoTimerId = React.useRef<number | null>(null);
  const autoIntervalId = React.useRef<number | null>(null);
  const degree = React.useRef(0);
  const radius = 200;

  React.useEffect(() => {
    function scheduleOrbitPause() {
      if (autoTimerId.current) clearTimeout(autoTimerId.current);
      if (autoIntervalId.current) cancelAnimationFrame(autoIntervalId.current);
      setIsAutomatic(false);
      degree.current = 0;

      autoTimerId.current = window.setTimeout(() => {
        setIsAutomatic(true);
      }, 2000);
    }

    scheduleOrbitPause();
    const u1 = posX.on('change', scheduleOrbitPause);
    const u2 = posY.on('change', scheduleOrbitPause);
    return () => {
      u1();
      u2();
      if (autoTimerId.current) clearTimeout(autoTimerId.current);
    };
  }, [posX, posY]);

  React.useEffect(() => {
    if (!isAutomatic || !isMounted || !initiated.current) return;

    const step = () => {
      degree.current = (degree.current + 0.2) % 360;
      const cx = radius * Math.cos(degree.current * (Math.PI / 180));
      const cy = radius * Math.sin(degree.current * (Math.PI / 180));
      blobX.set(width.get() - posX.get() - radius + cx);
      blobY.set(height.get() - posY.get() - radius + cy);
      autoIntervalId.current = requestAnimationFrame(step);
    };
    autoIntervalId.current = requestAnimationFrame(step);
    return () => {
      if (autoIntervalId.current) cancelAnimationFrame(autoIntervalId.current);
    };
  }, [isAutomatic]);

  React.useEffect(() => {
    return () => {
      if (autoTimerId.current) clearTimeout(autoTimerId.current);
      if (autoIntervalId.current) cancelAnimationFrame(autoIntervalId.current);
    };
  }, []);

  return (
    <motion.div style={{ x: smoothX, y: smoothY, opacity: isMounted ? '1' : '0' }} className={styles.blobWrapper}>
      <div className={styles.blob} />
    </motion.div>
  );
}

export default AuraBlob;
