'use client';
import Image from 'next/image';
import * as React from 'react';
import { hover, motion } from 'motion/react';
import styles from './stack.module.css';
import useSound from '@/hooks/useSound';

function TechStack() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [hoveredWrapper, setHoveredWrapper] = React.useState<boolean>(false);
  const playSoundEffect = useSound('/sounds/card-spread.wav', 1000);
  const firstHover = React.useRef(true);

  const stacks = [
    { img: '/Images/stack/nextdotjs.svg', color: 'white', name: 'nextjs' },
    { img: '/Images/stack/css-3.svg', color: 'blue', name: 'css' },
    { img: '/Images/stack/html-1.svg', color: 'orange', name: 'html' },
    { img: '/Images/stack/nodejs-3.svg', color: 'green', name: 'nodejs' },
    { img: '/Images/stack/react-logo.svg', color: 'yellow', name: 'react' },
    { img: '/Images/stack/typescript.svg', color: 'blue', name: 'typescript' },
    { img: '/Images/stack/javascript.png', color: 'yellow', name: 'javascript' },
  ];

  const stack_size = stacks.length;
  const stack_width = 175;

  function calculateWidth(index: number) {
    if (hovered) {
      const distance = Math.abs(hovered - index);
      const new_width = stack_width * 0.6 - distance * 5;
      return new_width < 50 ? 50 : new_width;
    }
    const position_percentage = index / stack_size;
    const value = position_percentage * stack_width;
    return value > 50 ? value : 50;
  }

  return (
    <motion.div
      onMouseOver={() => {
        setHoveredWrapper(true);
        if (firstHover.current) {
          playSoundEffect();
          firstHover.current = false;
        }
      }}
      onMouseLeave={() => {
        setHoveredWrapper(false);
        firstHover.current = true;
      }}
      layout="position"
      style={{
        display: 'grid',
        gridTemplateColumns: hoveredWrapper ? 'repeat(3, 1fr)' : '1fr',
        gap: '1rem',
      }}
      className={styles.stackWrapper}
    >
      {stacks.map((stack, index) => (
        <motion.div
          key={index}
          className={`${styles.stack}`}
          layout
          onMouseOver={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{
            gridColumn: hoveredWrapper ? 'auto' : '1',
            gridRow: hoveredWrapper ? 'auto' : '1',
          }}
          initial={{ x: -40 }}
          whileInView={{ x: 20 * index }}
          animate={hoveredWrapper ? { x: 0, rotateX: 0, rotateY: 0, rotateZ: 0 } : { rotateX: 20, rotateY: 20 }}
        >
          <div>
            <Image src={stack.img} width="100" height="100" alt={stack.name} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TechStack;
