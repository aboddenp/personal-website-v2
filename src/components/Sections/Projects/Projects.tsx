import styles from './project.module.css';
import * as React from 'react';
import ProjectCard from '@/components/ProjectCard';

function Projects() {
  return (
    <section id={'projects'} className={`spaced `}>
      <h2 className={`${styles.sectionHeading}`}>Things I've Built</h2>
      <div className={styles.grid}>
        <ProjectCard
          img_src={'/Images/PrismaScreenshot.png'}
          title={'Lorem something'}
          description={'This is the first card'}
          external_link="/Images/PrismaScreenshot.png"
          internal_link="/Images/PrismaScreenshot.png"
        />
        <ProjectCard
          img_src={'/Images/PrismaScreenshot.png'}
          title={'Lorem something'}
          description={'This is the first card'}
          external_link="/Images/PrismaScreenshot.png"
          internal_link="/Images/PrismaScreenshot.png"
        />
        <ProjectCard
          img_src={'/Images/PrismaScreenshot.png'}
          title={'Lorem something'}
          description={'This is the first card'}
          external_link="/Images/PrismaScreenshot.png"
          internal_link="/Images/PrismaScreenshot.png"
        />
        <ProjectCard
          img_src={'/Images/PrismaScreenshot.png'}
          title={'Lorem something'}
          description={'This is the first card'}
          external_link="/Images/PrismaScreenshot.png"
          internal_link="/Images/PrismaScreenshot.png"
        />
        <ProjectCard
          img_src={'/Images/PrismaScreenshot.png'}
          title={'Lorem something'}
          description={'This is the first card'}
          external_link="/Images/PrismaScreenshot.png"
          internal_link="/Images/PrismaScreenshot.png"
        />
        <ProjectCard
          img_src={'/Images/PrismaScreenshot.png'}
          title={'Lorem something'}
          description={'This is the first card'}
          external_link="/Images/PrismaScreenshot.png"
          internal_link="/Images/PrismaScreenshot.png"
        />
      </div>
    </section>
  );
}

export default Projects;
