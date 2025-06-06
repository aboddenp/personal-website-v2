import * as React from 'react';
import styles from './visuallyHidden.module.css';

function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className={styles.hiddenWrapper}>{children}</span>;
}

export default VisuallyHidden;
