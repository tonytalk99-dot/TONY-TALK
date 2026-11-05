/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INQUIRY_ENDPOINT?: string;
  readonly VITE_PUBLIC_CONTACT_EMAIL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}