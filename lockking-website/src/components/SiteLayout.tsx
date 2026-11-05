import { Outlet } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function SiteLayout() {
  const { t } = useLanguage();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {t.common.skipToContent}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}