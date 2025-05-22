import Image from 'next/image';
import styles from './about.module.css';
import * as React from 'react';
import ProjectCard from '@/components/ProjectCard';

function Projects() {
  return (
    <section id={'projects'} className="spaced">
      <ProjectCard
        img_src={'/Images/Honduras.png'}
        title={'Lorem something'}
        description={'This is the first card'}
        external_link="/Imgaes/Honduras.png"
        internal_link="/Images/Honduras.png"
      />
    </section>
  );
}

export default Projects;
