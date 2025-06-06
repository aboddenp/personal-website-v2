'use client';
import * as React from 'react';
import * as Dial from '@radix-ui/react-dialog';
import styles from './Dialog.module.css';
import { useDialog } from '../DialogProvider';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion'; // corrected import
import VisuallyHidden from '../VisuallyHidden';

type DialogProps = {
  description: string;
  title: string;
  children: React.ReactNode;
};

function Dialog({ description, title, children }: DialogProps) {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const [showContent, setShowContent] = React.useState(isOpen);

  // Track isOpen and delay unmount for exit animation
  React.useEffect(() => {
    if (isOpen) {
      setShowContent(true);
    } else {
      const timeout = setTimeout(() => setShowContent(false), 400); // match exit animation
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <Dial.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (open) openDialog();
        else closeDialog();
      }}
    >
      {showContent && (
        <Dial.Portal forceMount>
          <Dial.Overlay className={styles.overlay} />
          <div className={styles.contentWrapper}>
            <Dial.Content className={styles.dialogContent} forceMount>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="dialog"
                    className={styles.content}
                    initial={{ opacity: 0, y: '100vh' }}
                    animate={{ opacity: 1, y: '0vh' }}
                    exit={{ opacity: 0, y: '100vh', transition: { type: 'spring', stiffness: 400, damping: 40 } }}
                    transition={{ type: 'spring', stiffness: 200, damping: 40 }}
                  >
                    <VisuallyHidden>
                      <Dial.Title>{title}</Dial.Title>
                    </VisuallyHidden>
                    <div className={styles.contentScroll}>
                      <VisuallyHidden>
                        <Dial.Description>{description}</Dial.Description>
                      </VisuallyHidden>
                      {children}
                    </div>

                    <Dial.Close className={styles.close}>
                      <X />
                    </Dial.Close>
                  </motion.div>
                )}
              </AnimatePresence>
            </Dial.Content>
          </div>
        </Dial.Portal>
      )}
    </Dial.Root>
  );
}

export default Dialog;
