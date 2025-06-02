'use client';
import Image from 'next/image';
import * as React from 'react';
import { hover, motion } from 'motion/react';
import styles from './stack.module.css';

function TechStack() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [hoveredWrapper, setHoveredWrapper] = React.useState<boolean>(false);

  const stacks = [
    { img: '/Images/stack/javascript.png', color: 'yellow', name: 'javascript' },
    { img: '/Images/stack/nextdotjs.svg', color: 'white', name: 'javascript' },
    { img: '/Images/stack/css-3.svg', color: 'blue', name: 'javascript' },
    { img: '/Images/stack/html-1.svg', color: 'orange', name: 'javascript' },
    { img: '/Images/stack/nodejs-3.svg', color: 'green', name: 'javascript' },
    { img: '/Images/stack/typescript.svg', color: 'blue', name: 'javascript' },
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
      onMouseOver={() => setHoveredWrapper(true)}
      onMouseLeave={() => setHoveredWrapper(false)}
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
