import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { t } = useLanguage();

  return (
    <Link className={`brand brand--${tone}`} to="/" aria-label={`LOCKKING — ${t.common.home}`}>
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 36 36" focusable="false">
          <path d="M10 16v-4a8 8 0 0 1 16 0v4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <rect x="7" y="15" width="22" height="16" rx="2" fill="currentColor" />
          <circle cx="18" cy="22" r="2.2" className="brand__keyhole" />
          <path d="M18 23.5v3" className="brand__keyhole" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="brand__text">
        <span className="brand__name">LOCKKING</span>
        <span className="brand__subline">{t.common.brandSubline}</span>
      </span>
    </Link>
  );
}