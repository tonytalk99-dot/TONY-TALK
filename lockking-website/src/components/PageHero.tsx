import type { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  currentLabel: string;
  children?: ReactNode;
  visual?: ReactNode;
}

export default function PageHero({ eyebrow, title, intro, currentLabel, children, visual }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className={`container page-hero__inner ${visual ? 'page-hero__inner--split' : ''}`}>
        <div className="page-hero__copy">
          <Breadcrumbs items={[{ label: currentLabel }]} />
          <span className="eyebrow eyebrow--blue">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          {children ? <div className="page-hero__actions">{children}</div> : null}
        </div>
        {visual ? <div className="page-hero__visual">{visual}</div> : null}
      </div>
    </section>
  );
}