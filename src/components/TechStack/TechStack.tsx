'use client';
import Image from 'next/image';
import * as React from 'react';
import { hover, motion } from 'motion/react';
import styles from './stack.module.css';

function TechStack() {
  const [hovered, setHovered] = React.useState<number | null>(null);

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
    <div className={styles.stackWrapper}>
      {stacks.map((stack, index) => (
        <motion.div
          initial={false}
          animate={{
            width: index === hovered ? '175px' : calculateWidth(index),
          }}
          key={index}
          className={styles.stack}
          onMouseOver={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <div>
            <Image src={stack.img} width="100" height="100" alt={stack.name} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default TechStack;
