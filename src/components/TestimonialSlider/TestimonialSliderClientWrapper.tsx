import TestimonialSlider from '@/components/TestimonialSlider';
import Testimonials, { TestimonialType } from '@/components/TestimonialSlider/data/testimonials';
import Testimonial from '@/components/TestimonialSlider/Testimonial';
import styles from '@/components/TestimonialSlider/testimonialSlider.module.css';

function TestimonialSliderClient() {
  return (
    <TestimonialSlider>
      {Testimonials.map((testimonial: TestimonialType) => (
        <div key={testimonial.id} className={`${styles.emblaSlide}`}>
          <Testimonial {...testimonial} />
        </div>
      ))}
    </TestimonialSlider>
  );
}

export default TestimonialSliderClient;
