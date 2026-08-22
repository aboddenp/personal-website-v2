'use client';
import * as React from 'react';
import useSound from '@/hooks/useSound';

function NavItem({ label, link }: { label: string; link: string }) {
  const play = useSound(['/sounds/plop.webm', '/sounds/plop.mp3']);

  return (
    <li>
      <a href={link} onClick={play}>
        {' '}
        {label}{' '}
      </a>
    </li>
  );
}

export default NavItem;
