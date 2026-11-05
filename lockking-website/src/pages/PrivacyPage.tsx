import { Link } from 'react-router-dom';
import { FileWarning } from 'lucide-react';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { useLanguage } from '../i18n/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo page="privacy" />
      <PageHero
        eyebrow={t.privacy.eyebrow}
        title={t.privacy.title}
        intro={t.privacy.intro}
        currentLabel={t.common.privacyLink}
      />

      <section className="section">
        <div className="container legal-layout">
          <div className="draft-banner">
            <FileWarning aria-hidden="true" size={24} />
            <p>{t.privacy.draftNotice}</p>
          </div>
          <div className="legal-sections">
            {t.privacy.sections.map((section, index) => (
              <section className="legal-section" key={section.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </div>
              </section>
            ))}
          </div>
          <Link className="button button--primary" to="/contact?intent=project">
            {t.privacy.backToContact}
          </Link>
        </div>
      </section>
    </>
  );
}