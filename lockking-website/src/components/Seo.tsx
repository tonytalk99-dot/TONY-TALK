import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Translation } from '../i18n/translations';
import { siteConfig } from '../data/site';

type PageKey = keyof Translation['meta'];

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.remove();
}

function setCanonical(url: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!url) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

export default function Seo({ page }: { page: PageKey }) {
  const { language, t } = useLanguage();

  useEffect(() => {
    const meta = t.meta[page];
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'LOCKKING');
    setMeta('property', 'og:locale', language === 'zh' ? 'zh_CN' : 'en_US');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);

    if (siteConfig.siteUrl) {
      const canonical = `${siteConfig.siteUrl}${window.location.pathname}`;
      setCanonical(canonical);
      setMeta('property', 'og:url', canonical);
    } else {
      setCanonical(null);
      removeMeta('property', 'og:url');
    }
  }, [language, page, t]);

  return null;
}