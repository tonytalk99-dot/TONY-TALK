import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  body?: string;
  action?: { label: string; to: string };
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  children?: ReactNode;
}

export default function SectionHeading({
  kicker,
  title,
  body,
  action,
  align = 'left',
  tone = 'light',
  children,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align} section-heading--${tone}`}>
      <div className="section-heading__copy">
        <span className="eyebrow">{kicker}</span>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      {action ? (
        <Link className="text-link section-heading__action" to={action.to}>
          {action.label}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
      {children}
    </div>
  );
}