import { BookOpenText, ExternalLink, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import styles from './projectCard.module.css';
import * as React from 'react';
import { RichText } from '@/types';

export type ProjectCardProps = {
  img_src: string;
  title: string;
  description: RichText;
  external_link?: string;
  internal_link?: () => void;
};

function ProjectCard({ img_src, title, description, external_link, internal_link }: ProjectCardProps) {
  return (
    <article className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image src={img_src} alt={`Image Representation of ${title} project `} width="369" height="234" />
        </div>
        <div className={styles.content}>
          <div>
            <h3> {title}</h3>
            <p>{description}</p>
          </div>
          <div className={styles.icons}>
            {external_link && (
              <a target="_blank" href={external_link}>
                <ExternalLink width={18} height={18} />
              </a>
            )}
            {internal_link && (
              <button onClick={() => internal_link()}>
                <BookOpenText width={18} height={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
