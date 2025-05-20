'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import styles from './HamburgerButton.module.css';

export type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
};

function HamburgerButton({ isOpen, ...delegate }: HamburgerProps) {
  return (
    <button {...delegate} className={styles.button}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          animate={{ rotate: isOpen ? '-45deg' : '0', d: isOpen ? 'M4 12h16' : 'M4 6h16' }}
          initial="false"
          d="M4 6h16"
        />
        <motion.path animate={{ opacity: isOpen ? 0 : 1 }} initial="false" d="M4 12h16" />
        <motion.path
          animate={{ rotate: isOpen ? '45deg' : '0', d: isOpen ? 'M4 12h16' : 'M4 18h16' }}
          initial="false"
          d="M4 18h16"
        />
      </svg>
    </button>
  );
}

export default HamburgerButton;
