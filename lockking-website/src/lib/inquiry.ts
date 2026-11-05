import { siteConfig } from '../data/site';
import type { InquiryFormValues } from './validation';

export interface InquiryPayload extends Omit<InquiryFormValues, 'website' | 'consent'> {
  consent: true;
  productContextId: string | null;
  inquiryIntent: string;
  language: 'en' | 'zh';
  source: 'lockking-website';
}

export class InquiryNotConfiguredError extends Error {
  constructor() {
    super('INQUIRY_ENDPOINT_NOT_CONFIGURED');
    this.name = 'InquiryNotConfiguredError';
  }
}

export class InquirySubmissionError extends Error {
  constructor() {
    super('INQUIRY_SUBMISSION_FAILED');
    this.name = 'InquirySubmissionError';
  }
}

interface SubmitOptions {
  endpoint?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export async function submitInquiry(payload: InquiryPayload, options: SubmitOptions = {}): Promise<void> {
  const endpoint = (options.endpoint ?? siteConfig.inquiryEndpoint).trim();
  if (!endpoint) throw new InquiryNotConfiguredError();

  const fetchImpl = options.fetchImpl ?? fetch;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 15000);

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) throw new InquirySubmissionError();
  } catch (error) {
    if (error instanceof InquirySubmissionError) throw error;
    throw new InquirySubmissionError();
  } finally {
    window.clearTimeout(timeout);
  }
}