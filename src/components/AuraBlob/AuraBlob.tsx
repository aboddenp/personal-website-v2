'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import styles from './AuraBlob.module.css';
import useMousePosition from '@/hooks/useMousePosition';

function AuraBlob() {
  const { x: posX, y: posY, isOutOfBounds } = useMousePosition();
  const [autoX, setAutoX] = React.useState(0);
  const [autoY, setAutoY] = React.useState(0);

  let blobPosX = `calc(100% - ${posX}px)`;
  let blobPosY = `calc(100% - ${posY}px)`;

  if (isOutOfBounds()) {
    blobPosX = '500px';
    blobPosY = '500px';
  }

  const [isAutomatic, setIsAutomatic] = React.useState<boolean>(false);

  const autoTimerId = React.useRef<number | null>(null);
  const autoIntervalId = React.useRef<number | null>(null);
  const [_, setDegree] = React.useState<number>(0);
  const radius = 200;

  function degToRad(deg: number) {
    return deg * (Math.PI / 180);
  }

  if (isAutomatic && autoX && autoY) {
    blobPosX = `calc((${blobPosX}) - (${radius}px) + ${autoX}px)`;
    blobPosY = `calc(${blobPosY} +  ${autoY}px)`;
  }

  React.useEffect(() => {
    if (autoTimerId.current && autoIntervalId.current) {
      clearTimeout(autoTimerId.current);
      cancelAnimationFrame(autoIntervalId.current);
      setDegree(0);
      setAutoX(0);
      setAutoY(0);
      setIsAutomatic(false);
    }

    const autoTimer = window.setTimeout(() => {
      setIsAutomatic(true);
      const step = () => {
        setDegree((oldValue) => {
          const newDegree = (oldValue + 0.2) % 360;
          setAutoX(Math.floor(radius * Math.cos(degToRad(newDegree))));
          setAutoY(Math.floor(radius * Math.sin(degToRad(newDegree))));
          return newDegree;
        });
        autoIntervalId.current = requestAnimationFrame(step);
      };
      autoIntervalId.current = requestAnimationFrame(step);
    }, 2000);

    autoTimerId.current = autoTimer;

    return () => {
      clearTimeout(autoTimer);
      if (autoIntervalId.current) cancelAnimationFrame(autoIntervalId.current);
    };
  }, [posX]);

  return (
    <motion.div
      animate={{ top: blobPosY, left: blobPosX, transition: { stiffness: 150, damping: 80, type: 'spring' } }}
      className={`${styles.blobWrapper}`}
    >
      <div className={`${styles.blob}`}></div>
    </motion.div>
  );
}

export default AuraBlob;
