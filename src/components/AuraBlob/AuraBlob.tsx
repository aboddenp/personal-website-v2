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

  if (isAutomatic) {
    blobPosX = `calc(${blobPosX}px + ${autoX}px)`;
    blobPosY = `calc(${blobPosY} +  ${autoY}px)`;
  }

  React.useEffect(() => {
    if (autoTimerId.current && autoIntervalId.current) {
      clearTimeout(autoTimerId.current);
      clearInterval(autoIntervalId.current);
      setIsAutomatic(false);
    }

    const autoTimer = window.setTimeout(() => {
      setIsAutomatic(true);
      console.log('turned on automatic');
      autoIntervalId.current = window.setInterval(() => {
        setDegree((oldValue) => {
          setAutoX(Math.floor(radius * Math.cos(degToRad(oldValue + 5))));
          setAutoY(Math.floor(radius * Math.sin(degToRad(oldValue + 5))));
          return oldValue + 5;
        });
      }, 300);
    }, 2000);

    autoTimerId.current = autoTimer;

    return () => {
      clearTimeout(autoTimer);
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
