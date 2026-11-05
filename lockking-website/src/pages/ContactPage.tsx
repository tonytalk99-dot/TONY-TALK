import InquiryForm from '../components/InquiryForm';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { useLanguage } from '../i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo page="contact" />
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        intro={t.contact.intro}
        currentLabel={t.nav.contact}
      />

      <section className="section contact-section">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2>{t.contact.sideTitle}</h2>
            <p>{t.contact.sideIntro}</p>
            <ol className="contact-steps">
              {t.contact.sideSteps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </aside>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}