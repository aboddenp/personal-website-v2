import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import styles from './Navbar.module.css';
import HamburgerMenu from '../HamburgerMenu';
import NavbarClient from './NavbarClient';
import navLinks from './data/main_menu';

function Navbar() {
  return (
    <NavbarClient>
      <div className={styles['navbar-wrapper']}>
        <div className={`max-content ${styles.navbar}`}>
          <Link href="/">
            <Image width="73" height="80" src="/Images/Asters_logo_light.svg" alt={"Aster's Logo"} />
          </Link>
          <HamburgerMenu className={styles.mobileMenu} links={navLinks} />
          <nav className={styles.desktopMenu}>
            <ul className={styles.nav}>
              {navLinks.map(({ label, link }) => (
                <li key={label + link}>
                  <a href={link}> {label} </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </NavbarClient>
  );
}

export default Navbar;
