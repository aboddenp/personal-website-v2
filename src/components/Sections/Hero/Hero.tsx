import * as React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.wrapper}>
      <Image
        width="246"
        height="245"
        src="/Images/Avatar_Aster.png"
        alt="Aster Bodden Animated Profile Picture"
      ></Image>
      <h1>
        Hi, I'm Aster. I'm a versatile developer who transforms ideas into beautiful and functional web applications.
      </h1>

      <svg width="24" height="58" viewBox="0 0 24 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 6.50964V10.5096M12 2.50964C15.866 2.50964 19 5.64365 19 9.50964V15.5096C19 19.3756 15.866 22.5096 12 22.5096C8.13401 22.5096 5 19.3756 5 15.5096V9.50964C5 5.64365 8.13401 2.50964 12 2.50964Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6464 55.8632C11.8417 56.0585 12.1583 56.0585 12.3536 55.8632L15.5355 52.6812C15.7308 52.486 15.7308 52.1694 15.5355 51.9741C15.3403 51.7788 15.0237 51.7788 14.8284 51.9741L12 54.8025L9.17157 51.9741C8.97631 51.7788 8.65973 51.7788 8.46447 51.9741C8.2692 52.1694 8.2692 52.486 8.46447 52.6812L11.6464 55.8632ZM12 55.5096H12.5L12.5 32.5096H12H11.5L11.5 55.5096H12Z"
          fill="white"
        />
      </svg>
    </section>
  );
}

export default Hero;
