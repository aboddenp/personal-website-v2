import Image from 'next/image';
import styles from './about.module.css';
import * as React from 'react';
import SoundBox from '@/components/SoundBox';

function About() {
  return (
    <section id={'about'} className="spaced layout-2col">
      <div>
        <h2>About Me</h2>
        <p>
          I’m a software engineer specializing in front-end development, passionate about building fast, accessible, and
          intuitive web applications. I have a keen eye for clean design and smooth user interactions, and I enjoy
          architecting solutions that scale efficiently. I hold a Computer Science degree from George Mason University
          and have spent the past few years working with modern frameworks, CMS platforms, and API integrations to help
          startups and teams bring their web applications and digital experiences to life. When I’m not coding, I’m
          usually lifting heavy things 🏋🏽, growing dangerously hot peppers 🌶️, or drinking way too much coffee ☕.
        </p>
      </div>
      <Image
        className={styles.image}
        src="/Images/Honduras.png"
        alt={'Map of Honduras showing pictures taken by Aster of his hobbies'}
        width="492"
        height="364"
      />
    </section>
  );
}

export default About;
