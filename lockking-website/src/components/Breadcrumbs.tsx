import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useLanguage();

  return (
    <nav className="breadcrumbs" aria-label={t.common.breadcrumbLabel}>
      <ol>
        <li>
          <Link to="/">{t.common.home}</Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.to ?? 'current'}`} aria-current={item.to ? undefined : 'page'}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}