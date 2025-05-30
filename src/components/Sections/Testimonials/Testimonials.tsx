import TestimonialSliderClient from '@/components/TestimonialSlider/TestimonialSliderClientWrapper';
import * as React from 'react';

function TestimonialSection() {
  return (
    <section id="testimonials" className="spaced">
      <h2 className="centeredText">Nice Things People Have Said</h2>
      <TestimonialSliderClient />
    </section>
  );
}

export default TestimonialSection;
