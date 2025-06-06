/* TODO: Optimize */
'use client';
import styles from './project.module.css';
import * as React from 'react';
import ProjectCard from '@/components/ProjectCard';
import projectsData from './data/projects';
import Dialog from '@/components/Dialog';
import { useDialog } from '@/components/DialogProvider';

function Projects() {
  /*TODO: double check this is a server component as much as possible fix architecture for opening dialog  */
  const { openDialog } = useDialog();
  return (
    <section id={'projects'} className={`spaced `}>
      <h2 className={`${styles.sectionHeading}`}>Things I've Built</h2>
      <div className={styles.grid}>
        {projectsData.map((delegate, index) => (
          <ProjectCard key={index} {...delegate} internal_link={delegate.internal_link ? openDialog : undefined} />
        ))}
      </div>
      <Dialog description={'Dialog Modal exploring what is Atlas Theme'} title="Atlas Overview">
        <section style={{ maxWidth: '80ch', margin: '0 auto' }}>
          <h2>🚀 Road to Atlas 2</h2>
          <p>
            I maintained <strong>Atlas Free</strong> and <strong>Atlas Pro</strong>, two of the most popular HubSpot CMS
            themes for B2B SaaS. My role involved debugging user issues, implementing feature requests, and shipping
            updates to improve flexibility and maintainability.
          </p>
          <p>
            As usage grew, so did the friction. Our team decided to rebuild from the ground up—<strong>Atlas 2</strong>
            —with a focus on developer ergonomics and marketing usability. Instead of dozens of rigid modules, we built
            a smaller set of <strong>highly configurable components</strong> with smart defaults and custom styling
            options.
          </p>
          <p>
            One of the key technical challenges was working around HubSpot’s JSON-based module field limitations. We
            introduced a pattern for <strong>shared, centralized fields</strong> (like a global rich text config),
            allowing updates to cascade across all instances—improving consistency and maintainability.
          </p>
          <p>
            We prioritized performance from the start: the stack was pure <strong>HTML, CSS, and vanilla JS</strong>,
            with no frameworks or heavy dependencies. The only library used was <strong>Embla.js</strong> for
            lightweight sliders—helping us keep the bundle lean and fast.
          </p>
        </section>
      </Dialog>
    </section>
  );
}

export default Projects;
