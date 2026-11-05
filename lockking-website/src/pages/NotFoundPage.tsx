import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo page="notFound" />
      <section className="not-found">
        <div className="container not-found__inner">
          <span className="not-found__code" aria-hidden="true">
            404
          </span>
          <span className="eyebrow">{t.notFound.eyebrow}</span>
          <h1>{t.notFound.title}</h1>
          <p>{t.notFound.body}</p>
          <Link className="button button--primary" to="/">
            {t.notFound.cta}
          </Link>
        </div>
      </section>
    </>
  );
}