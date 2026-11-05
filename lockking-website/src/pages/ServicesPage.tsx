import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';
import FaqAccordion from '../components/FaqAccordion';
import PageHero from '../components/PageHero';
import ProcessTimeline from '../components/ProcessTimeline';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { useLanguage } from '../i18n/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo page="services" />
      <PageHero
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        intro={t.services.intro}
        currentLabel={t.nav.services}
      >
        <Link className="button button--primary" to="/contact?intent=project">
          {t.services.primaryCta}
        </Link>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="mode-grid">
            {t.services.modes.map((mode) => (
              <article className="mode-card" key={mode.label}>
                <span className="mode-card__label">{mode.label}</span>
                <h2>{mode.title}</h2>
                <p>{mode.body}</p>
                <ul className="check-list">
                  {mode.points.map((point) => (
                    <li key={point}>
                      <Check aria-hidden="true" size={17} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHeading
            kicker={t.services.customizationKicker}
            title={t.services.customizationTitle}
            body={t.services.customizationIntro}
            tone="dark"
          />
          <div className="customization-grid">
            {t.services.customizations.map((item, index) => (
              <article className="customization-card" key={item.title}>
                <span className="customization-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="assessment-tag">{t.common.subjectToAssessment}</span>
              </article>
            ))}
          </div>
          <p className="dark-note">{t.services.assessmentNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            kicker={t.services.processKicker}
            title={t.services.processTitle}
            body={t.services.processIntro}
          />
          <ProcessTimeline steps={t.services.process} />
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container split-panel">
          <SectionHeading
            kicker={t.services.beforeKicker}
            title={t.services.beforeTitle}
            body={t.services.beforeIntro}
          />
          <ul className="numbered-list">
            {t.services.beforeItems.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <SectionHeading kicker={t.services.faqKicker} title={t.services.faqTitle} />
          <FaqAccordion items={t.services.faqs} idPrefix="services-faq" />
        </div>
      </section>

      <CtaBand
        title={t.services.ctaTitle}
        body={t.services.ctaBody}
        primaryLabel={t.services.ctaPrimary}
        primaryTo="/contact?intent=project"
      />
    </>
  );
}