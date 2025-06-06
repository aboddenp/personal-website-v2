import { ProjectCardProps } from '@/components/ProjectCard';
const ProjectsData: ProjectCardProps[] = [
  {
    img_src: '/Images/Atlas-2-cover.png',
    title: 'Atlas Ecosystem',
    description: (
      <>
        <span className="text-muted body-small ">Custom HubSpot theme built from scratch for B2B SaaS </span>
      </>
    ),
    external_link: 'https://www.kalungi.com/atlas-clean-hubspot-theme-for-b2b-saas-software',
    internal_link: () => {},
  },
  {
    img_src: '/Images/PrismaScreenshot.png',
    title: 'Prisma International',
    description: (
      <>
        <span className="text-muted body-small ">Custom HubSpot site built with Atlas</span>
      </>
    ),
    external_link: 'https://www.prisma.com/',
  },
  {
    img_src: '/Images/inpractice-cover.png',
    title: 'Inpractice AI',
    description: (
      <>
        <span className="text-muted body-small ">Custom HubSpot site built with Atlas</span>
      </>
    ),
    external_link: 'https://www.inpractice.ai/',
  },
  {
    img_src: '/Images/botdojo-cover.png',
    title: 'Botdojo',
    description: (
      <>
        <span className="text-muted body-small ">Custom HubSpot site built with Atlas</span>
      </>
    ),
    external_link: 'https://web.archive.org/web/20250114044308/https://www.botdojo.com/',
  },
  {
    img_src: '/Images/aldoa-cover.png',
    title: 'Aldoa',
    description: (
      <>
        <span className="text-muted body-small ">Custom HubSpot site built with Atlas</span>
      </>
    ),
    external_link: 'https://www.aldoa.com/',
  },
  {
    img_src: '/Images/aware-cover.png',
    title: 'Aware360',
    description: (
      <>
        <span className="text-muted body-small ">Custom HubSpot site built with Atlas</span>
      </>
    ),

    external_link: 'https://aware360.com/',
  },
];

export default ProjectsData;
