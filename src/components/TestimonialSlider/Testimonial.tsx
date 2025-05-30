import Image from 'next/image';
import * as React from 'react';
import styles from './testimonial.module.css';
import { TestimonialType } from './data/testimonials';

function Testimonial({ avatar_src, name, position, content }: TestimonialType) {
  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <Image className={styles.avatar} width={119} height={119} src={avatar_src} alt={`{name} profile pic`} />
        <div className={styles.metaData}>
          <span className={styles.position}>{position}</span>
          <h3>{name}</h3>
        </div>
      </header>
      <div className={styles.content}>{content}</div>
    </article>
  );
}

export default Testimonial;
