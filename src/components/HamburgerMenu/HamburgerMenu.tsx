'use client';
import * as React from 'react';
import { Link } from '@/components/Navbar/data/main_menu';
import HamburgerButton from '@/components/HamburgerButton';
import NavItem from '@/components/NavItem';
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
              <NavItem key={label + link} link={link} label={label} />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
