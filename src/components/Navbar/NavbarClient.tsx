'use client';
import useTopScroll from '@/hooks/useTopScroll';
import styles from './Navbar.module.css';
import * as React from 'react';

function NavbarClient({ children }: { children: React.ReactNode }) {
  const isTop = useTopScroll();

  return (
    <header className={`${styles.wrapper} `}>
      <div className={` ${styles.backdrop} ${isTop ? '' : styles.scrolled}`}></div>
      {children}
    </header>
  );
}

export default NavbarClient;
