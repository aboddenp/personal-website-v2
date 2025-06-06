'use client';
import * as React from 'react';
import { Link } from '@/components/Navbar/data/main_menu';
import HamburgerButton from '@/components/HamburgerButton';
import styles from './HamburgerMenu.module.css';

function HamburgerMenu({ links, className }: { links: Link[]; className?: string }) {
  const [showMenu, setShowMenu] = React.useState(false);

  function handleClick() {
    setShowMenu(!showMenu);
  }

  return (
    <div className={`${styles.wrapper} ${className ? className : ''}`}>
      <HamburgerButton onClick={handleClick} isOpen={showMenu} />
      {showMenu && (
        <nav
          onClick={() => {
            setTimeout(handleClick, 300);
          }}
          className={styles.nav}
        >
          <ul>
            {links.map(({ label, link }: Link) => (
              <li key={label + link}>
                <a href={link}> {label} </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
