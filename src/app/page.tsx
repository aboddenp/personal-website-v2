import Navbar from '@/components/Navbar';
import About from '@/components/Sections/AboutMe';
import Hero from '@/components/Sections/Hero';
import Projects from '@/components/Sections/Projects';
import RandomSection from '@/components/Sections/RandomSection';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content">
        <main>
          <Hero />
          <About />
          <Projects />
          <RandomSection />
        </main>
        <footer></footer>
      </div>
    </div>
  );
}
