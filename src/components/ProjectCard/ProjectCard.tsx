import { ExternalLink, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

type ProjectCardProps = {
  img_src: string;
  title: string;
  description: string;
  external_link?: string;
  internal_link?: string;
};

function ProjectCard({ img_src, title, description, external_link, internal_link }: ProjectCardProps) {
  return (
    <article>
      <Image src={img_src} alt={`Image Representation of ${title} project `} width="369" height="234" />
      <div>
        <div>
          <h3> {title}</h3>
          <p>{description}</p>
        </div>
        <div>
          {external_link && <ExternalLink />}
          {internal_link && <GraduationCap />}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
