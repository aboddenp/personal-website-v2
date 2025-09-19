'use client';
import * as React from 'react';
import useSound from '@/hooks/useSound';
import { Howler } from 'howler';

function NavItem({ label, link }: { label: string; link: string }) {
  const play = useSound('/sounds/plop.wav');
  //TODO: move useEffect to a better place
  //
  React.useEffect(() => {
    // Set global max volume (0.0 - 1.0)
    Howler.volume(0.4); // 50%
  }, []);

  return (
    <li onClick={play}>
      <a href={link}> {label} </a>
    </li>
  );
}

export default NavItem;
