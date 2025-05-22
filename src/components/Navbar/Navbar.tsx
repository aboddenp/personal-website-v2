import Image from 'next/image';
import * as React from 'react';
import styles from './Navbar.module.css';
import HamburgerMenu from '../HamburgerMenu';
import NavbarClient from './NavbarClient';

export type Link = { label: string; link: string };

function Navbar() {
  const links: Link[] = [
    {
      label: 'About',
      link: '#about',
    },
    {
      label: 'Projects',
      link: '#',
    },
    {
      label: 'Testimonials',
      link: '#',
    },
    {
      label: 'Contact Me',
      link: '#',
    },
  ];

  return (
    <NavbarClient>
      <div className={styles['navbar-wrapper']}>
        <div className={`max-content ${styles.navbar}`}>
          <Image width="73" height="80" src="/Images/Asters_logo_light.svg" alt={"Aster's Logo"} />
          <HamburgerMenu className={styles.mobileMenu} links={links} />
          <nav className={styles.desktopMenu}>
            <ul className={styles.nav}>
              {links.map(({ label, link }: Link) => (
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
