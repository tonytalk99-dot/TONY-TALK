import { Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';
import FaqAccordion from '../components/FaqAccordion';
import PageHero from '../components/PageHero';
import ProcessTimeline from '../components/ProcessTimeline';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { useLanguage } from '../i18n/LanguageContext';

export default function FactoryPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo page="factory" />
      <PageHero
        eyebrow={t.factory.eyebrow}
        title={t.factory.title}
        intro={t.factory.intro}
        currentLabel={t.nav.factory}
      >
        <Link className="button button--primary" to="/contact?intent=project">
          {t.factory.primaryCta}
        </Link>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="disclosure-panel">
            <ShieldCheck aria-hidden="true" size={28} />
            <div>
              <h2>{t.factory.disclosureTitle}</h2>
              <p>{t.factory.disclosureBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <SectionHeading
            kicker={t.factory.processKicker}
            title={t.factory.processTitle}
            body={t.factory.processIntro}
          />
          <ProcessTimeline steps={t.factory.process} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading kicker={t.factory.qcKicker} title={t.factory.qcTitle} body={t.factory.qcIntro} />
          <div className="dimension-grid">
            {t.factory.dimensions.map((dimension, index) => (
              <article className="dimension-card" key={dimension.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{dimension.title}</h3>
                <p>{dimension.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container split-panel split-panel--dark">
          <SectionHeading
            kicker={t.factory.verificationKicker}
            title={t.factory.verificationTitle}
            body={t.factory.verificationIntro}
            tone="dark"
          />
          <ul className="check-list check-list--dark">
            {t.factory.verificationItems.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container evidence-grid">
          <div className="evidence-copy">
            <span className="eyebrow">{t.factory.verificationKicker}</span>
            <h2>{t.factory.evidenceTitle}</h2>
            <p>{t.factory.evidenceBody}</p>
          </div>
          <ul className="evidence-list">
            {t.factory.evidencePoints.map((point) => (
              <li key={point}>
                <Check aria-hidden="true" size={18} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container faq-layout">
          <SectionHeading kicker={t.factory.faqKicker} title={t.factory.faqTitle} />
          <FaqAccordion items={t.factory.faqs} idPrefix="factory-faq" />
        </div>
      </section>

      <CtaBand
        title={t.factory.ctaTitle}
        body={t.factory.ctaBody}
        primaryLabel={t.factory.ctaPrimary}
        primaryTo="/contact?intent=project"
      />
    </>
  );
}