export type TestimonialType = {
  id: string;
  avatar_src: string;
  name: string;
  position?: string;
  content: string;
};

const Testimonials: TestimonialType[] = [
  {
    id: crypto.randomUUID(),
    avatar_src: '/Images/mike_northfield_avatar.jpeg',
    name: 'Mike Northfield',
    position: 'Marketing first-principlist @ Q-SYS',
    content:
      'Aster is a rare blend of steady and adventurous — dependable with deadlines and always experimenting with new tools behind the scenes. He’s played key roles across complex projects and full product builds, consistently delivering with humility and impact. Aster is the kind of developer who levels up both your product and your team.',
  },
  {
    id: crypto.randomUUID(),
    avatar_src: '/Images/amec_avatar.jpeg',
    name: 'Amec Velasquez',
    position: 'Web Development Lead @ Kalungi',
    content:
      'Aster is one of the smartest people I know. He picks up new tools and technologies quickly and always delivers clean, well-structured code. He\u2019s an excellent problem-solver who thinks through challenges and explores the best approaches. He\u2019s collaborative, thoughtful, and always willing to help others. He knows when to be independent and when to ask for help. Aster would be a valuable addition to any dev team, and I hope to work with him again someday.',
  },
  {
    id: crypto.randomUUID(),
    avatar_src: '/Images/juan_diego_avatar.jpeg',
    name: 'Juan Diego Bottarini',
    position: 'Web Development @ Kalungi',
    content:
      'I\u2019ve had the pleasure of working with Aster for two years, and from day one, I was impressed by his technical ability, clean and scalable code, and attention to detail when building software products. He\u2019s one of the most technical developers I\u2019ve ever met. His organizational skills and politeness make him a joy to work with. I\u2019m honestly a bit envious of the teams that get to work with him next.',
  },
  {
    id: crypto.randomUUID(),
    avatar_src: '/Images/anon-user-grey.png',
    name: 'Internal Reviewer',
    position: 'CMS Platform Review Team',
    content:
      'This is an excellent module—clearly built with thoughtfulness and attention to detail. The configuration options are intuitive, and the support for advanced features like clipping types is impressive. Implementing something like this outside of our platform can be a challenge, so seeing it integrated so seamlessly is remarkable. The fluid text sizing and mobile responsiveness really help content stand out. If I were building a site on this platform, this is a tool I’d absolutely use. It’s a great example of a well-executed solution from someone who understands both functionality and user experience.',
  },
];

export default Testimonials;
