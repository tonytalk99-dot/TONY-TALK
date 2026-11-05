import { ArrowRight, Cable, ClipboardCheck, MessagesSquare, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';
import FaqAccordion from '../components/FaqAccordion';
import ProcessTimeline from '../components/ProcessTimeline';
import ProductCard from '../components/ProductCard';
import ProductVisual from '../components/ProductVisual';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { productDirections } from '../data/products';
import { useLanguage } from '../i18n/LanguageContext';

const capabilityIcons = [SlidersHorizontal, Cable, ClipboardCheck, MessagesSquare];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo page="home" />
      <section className="home-hero">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <span className="eyebrow eyebrow--blue">{t.home.eyebrow}</span>
            <h1>
              <span>{t.home.titleLine1}</span>
              <span className="accent">{t.home.titleLine2}</span>
            </h1>
            <p>{t.home.intro}</p>
            <div className="home-hero__actions">
              <Link className="button button--primary" to="/contact?intent=project">
                {t.common.discussProject}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="button button--ghost" to="/products">
                {t.common.exploreProducts}
              </Link>
            </div>
            <ul className="hero-tags" aria-label={t.home.visualLabel}>
              {t.home.visualTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <div className="home-hero__visual">
            <ProductVisual
              variant="lever"
              label={t.home.visualLabel}
              ariaLabel={`${t.home.titleLine1} ${t.home.titleLine2}. ${t.common.conceptCaption}`}
              caption={t.common.conceptCaption}
            />
          </div>
        </div>
      </section>

      <section className="capability-strip" aria-label={t.home.eyebrow}>
        <div className="container capability-grid">
          {t.home.capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index];
            return (
              <article className="capability-card" key={capability.title}>
                <Icon className="capability-card__icon" aria-hidden="true" size={24} />
                <h2>{capability.title}</h2>
                <p>{capability.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            kicker={t.home.productsKicker}
            title={t.home.productsTitle}
            body={t.home.productsIntro}
            action={{ label: t.home.productsCta, to: '/products' }}
          />
          <div className="product-grid">
            {productDirections.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHeading
            kicker={t.home.servicesKicker}
            title={t.home.servicesTitle}
            body={t.home.servicesIntro}
            tone="dark"
            action={{ label: t.nav.services, to: '/services' }}
          />
          <div className="service-grid">
            {t.home.services.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="service-card__number" aria-hidden="true">
                  {service.number}
                </span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            kicker={t.home.processKicker}
            title={t.home.processTitle}
            body={t.home.processIntro}
          />
          <ProcessTimeline steps={t.home.process} />
        </div>
      </section>

      <section className="section section--subtle" id="why-lockking">
        <div className="container why-grid">
          <div className="why-intro">
            <span className="eyebrow">{t.home.whyKicker}</span>
            <h2>{t.home.whyTitle}</h2>
            <p>{t.home.whyIntro}</p>
            <Link className="text-link" to="/services">
              {t.nav.services}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="why-list">
            {t.home.whyPoints.map((point, index) => (
              <article className="why-item" key={point.title}>
                <span className="why-item__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <SectionHeading kicker={t.home.faqKicker} title={t.home.faqTitle} />
          <FaqAccordion items={t.home.faqs} idPrefix="home-faq" />
        </div>
      </section>

      <CtaBand
        title={t.home.ctaTitle}
        body={t.home.ctaBody}
        primaryLabel={t.home.ctaPrimary}
        primaryTo="/contact?intent=project"
        secondaryLabel={t.home.ctaSecondary}
        secondaryTo="/services"
      />
    </>
  );
}