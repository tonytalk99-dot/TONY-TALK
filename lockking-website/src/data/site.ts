const rawEndpoint = import.meta.env.VITE_INQUIRY_ENDPOINT?.trim() ?? '';
const rawEmail = import.meta.env.VITE_PUBLIC_CONTACT_EMAIL?.trim() ?? '';
const rawSiteUrl = import.meta.env.VITE_SITE_URL?.trim() ?? '';

export function isDisplayableEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const siteConfig = {
  inquiryEndpoint: rawEndpoint,
  publicContactEmail: isDisplayableEmail(rawEmail) ? rawEmail : '',
  siteUrl: rawSiteUrl && !rawSiteUrl.includes('example.') ? rawSiteUrl.replace(/\/$/, '') : '',
};