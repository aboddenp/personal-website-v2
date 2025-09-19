'use client';
import { Settings, Volume2, VolumeOffIcon } from 'lucide-react';
import { Howler } from 'howler';
import style from './Preferences.module.css';
import * as React from 'react';
import useSound from '@/hooks/useSound';
import {
  useFloating,
  offset,
  FloatingArrow,
  arrow,
  autoUpdate,
  useInteractions,
  useDismiss,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { useClick } from '@floating-ui/react';

const ARROW_HEIGHT = 7;
const GAP = 2;

function PreferencesMenu() {
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = React.useRef(null);
  const playFX = useSound('/sounds/tic.wav', 0);
  const { context, refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(ARROW_HEIGHT + GAP), // distance between reference and floating
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const { isMounted, styles } = useTransitionStyles(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  function handleVolume() {
    setIsMuted(!isMuted);
    window.setTimeout(() => {
      Howler.mute(isMuted);
    }, 500);
  }

  return (
    <>
      <button className={style.menuTrigger} ref={refs.setReference} {...getReferenceProps()}>
        <Settings color="var(--font-color)" />
      </button>
      {isMounted && (
        <ul
          className={style.menuPanel}
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...styles }}
          {...getFloatingProps}
        >
          <FloatingArrow
            className={style.arrow}
            ref={arrowRef}
            context={context}
            fill="var(--color-surface)"
            tipRadius={2}
          />
          <li
            onClick={() => {
              playFX(), handleVolume();
            }}
          >
            <button>
              {isMuted ? (
                <Volume2 color="var(--font-color)" aria-label="mute" />
              ) : (
                <VolumeOffIcon color="var(--font-color)" aria-label="turn volume on" />
              )}
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default PreferencesMenu;
