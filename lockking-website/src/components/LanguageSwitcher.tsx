import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label={t.common.languageLabel}>
      <button
        type="button"
        className="language-switcher__option"
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        {t.common.english}
      </button>
      <span className="language-switcher__divider" aria-hidden="true" />
      <button
        type="button"
        className="language-switcher__option"
        aria-pressed={language === 'zh'}
        onClick={() => setLanguage('zh')}
      >
        {t.common.chinese}
      </button>
    </div>
  );
}