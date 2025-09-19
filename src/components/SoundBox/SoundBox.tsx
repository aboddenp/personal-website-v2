'use client';
import * as React from 'react';
import useSound from '@/hooks/useSound';
function SoundBox() {
  const play = useSound('sounds/boop-bap.wav');
  const play2 = useSound('sounds/tic.wav');
  const play3 = useSound('sounds/exit-boop.wav');
  const play4 = useSound('sounds/plop.wav');

  return (
    <div>
      <div onClick={play}>
        <button>boop bap</button>
      </div>

      <div onClick={play2}>
        <button>tic</button>
      </div>

      <div onClick={play3}>
        <button>exit boop</button>
      </div>

      <div onClick={play4}>
        <button>plop</button>
      </div>
    </div>
  );
}

export default SoundBox;
