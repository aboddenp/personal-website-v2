import Navbar from '@/components/Navbar';
import About from '@/components/Sections/AboutMe';
import Footer from '@/components/Sections/Footer';
import Hero from '@/components/Sections/Hero';
import Projects from '@/components/Sections/Projects';
import TechStackSection from '@/components/Sections/TechStack';
import TestimonialSection from '@/components/Sections/Testimonials';

export default async function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content">
        <main>
          <Hero />
          <About />
          <Projects />
          <TestimonialSection />
          <TechStackSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
