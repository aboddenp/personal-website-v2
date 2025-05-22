import Image from 'next/image';
import styles from './about.module.css';
import * as React from 'react';

function About() {
  return (
    <section id={'about'} className="spaced layout-2col">
      <div>
        <h2>About Me</h2>
        <p>
          I’m a front-end developer who loves building clean, fast, and accessible websites—with a soft spot for great
          design and smooth interactions. I have a Computer Science degree from George Mason University, and I’ve spent
          the last years working with modern frameworks and CMS platforms to help startups and teams bring their
          sites/apps to life. When I’m not writing code, I’m usually lifting heavy things 🏋🏽, growing dangerously hot
          peppers 🌶️, or drinking way too much coffee ☕. The ocean is my happy place 🌊—and so is learning something
          new.
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
