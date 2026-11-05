import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { formatTemplate } from '../lib/format';
import { siteConfig } from '../data/site';
import Logo from './Logo';

export default function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo tone="dark" />
          <p>{t.footer.tagline}</p>
          <p className="site-footer__disclaimer">{t.footer.disclaimer}</p>
        </div>
        <div>
          <h2 className="footer-heading">{t.footer.navigationTitle}</h2>
          <nav className="footer-links" aria-label={t.common.footerNavLabel}>
            <Link to="/products">{t.nav.products}</Link>
            <Link to="/services">{t.nav.services}</Link>
            <Link to="/factory">{t.nav.factory}</Link>
            <Link to="/contact">{t.nav.contact}</Link>
          </nav>
        </div>
        <div>
          <h2 className="footer-heading">{t.footer.contactTitle}</h2>
          <p className="footer-copy">{t.footer.contactBody}</p>
          {siteConfig.publicContactEmail ? (
            <a className="footer-email" href={`mailto:${siteConfig.publicContactEmail}`}>
              {siteConfig.publicContactEmail}
            </a>
          ) : null}
          <Link className="button button--outline button--compact footer-cta" to="/contact?intent=quote">
            {t.common.discussProject}
          </Link>
        </div>
        <div>
          <h2 className="footer-heading">{t.footer.legalTitle}</h2>
          <nav className="footer-links" aria-label={t.footer.legalTitle}>
            <Link to="/privacy">{t.footer.privacy}</Link>
          </nav>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>{formatTemplate(t.footer.copyright, { year })}</p>
      </div>
    </footer>
  );
}