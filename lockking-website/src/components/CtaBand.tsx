import { Link } from 'react-router-dom';

interface CtaBandProps {
  title: string;
  body: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function CtaBand({ title, body, primaryLabel, primaryTo, secondaryLabel, secondaryTo }: CtaBandProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band">
          <div className="cta-band__pattern" aria-hidden="true" />
          <div className="cta-band__copy">
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="cta-band__actions">
            <Link className="button button--primary" to={primaryTo}>
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryTo ? (
              <Link className="button button--ghost" to={secondaryTo}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}