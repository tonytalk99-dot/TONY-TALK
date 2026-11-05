import { describe, expect, it, vi } from 'vitest';
import {
  InquiryNotConfiguredError,
  InquirySubmissionError,
  submitInquiry,
  type InquiryPayload,
} from '../lib/inquiry';
import { validateInquiry, type InquiryFormValues } from '../lib/validation';

const payload: InquiryPayload = {
  fullName: 'Alex Morgan',
  businessEmail: 'alex@example.com',
  company: 'Example Brand',
  country: 'Germany',
  role: 'brand-owner',
  productInterest: 'slim',
  quantity: 'not-sure',
  timeline: '3-6',
  collaboration: 'odm',
  nda: true,
  projectDetails: 'Evaluating a slim-frame smart lock for a residential project in Germany.',
  consent: true,
  productContextId: 'slim-frame-smart-lock',
  inquiryIntent: 'sample',
  language: 'en',
  source: 'lockking-website',
};

describe('inquiry adapter', () => {
  it('refuses to transmit without an endpoint', async () => {
    const fetchImpl = vi.fn();
    await expect(submitInquiry(payload, { endpoint: '', fetchImpl })).rejects.toBeInstanceOf(
      InquiryNotConfiguredError,
    );
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('posts the inquiry payload to the configured endpoint', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 201 });
    await submitInquiry(payload, { endpoint: '/api/inquiries', fetchImpl });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, options] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/inquiries');
    expect(options.method).toBe('POST');
    expect(options.headers).toEqual({ 'Content-Type': 'application/json', Accept: 'application/json' });
    expect(JSON.parse(String(options.body))).toMatchObject({
      businessEmail: 'alex@example.com',
      consent: true,
      source: 'lockking-website',
    });
  });

  it('rejects unsuccessful HTTP responses', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    await expect(
      submitInquiry(payload, { endpoint: '/api/inquiries', fetchImpl }),
    ).rejects.toBeInstanceOf(InquirySubmissionError);
  });
});

describe('inquiry validation', () => {
  const messages = {
    fullName: 'name',
    businessEmail: 'email',
    company: 'company',
    country: 'country',
    projectDetails: 'details',
    consent: 'consent',
    website: 'spam',
  };

  const values: InquiryFormValues = {
    fullName: '',
    businessEmail: 'not-an-email',
    company: '',
    country: '',
    role: '',
    productInterest: 'not-sure',
    quantity: 'not-sure',
    timeline: 'not-sure',
    collaboration: 'not-sure',
    nda: false,
    projectDetails: 'short',
    consent: false,
    website: '',
  };

  it('flags missing required fields, invalid email and short project details', () => {
    const errors = validateInquiry(values, messages);
    expect(errors).toMatchObject({
      fullName: 'name',
      businessEmail: 'email',
      company: 'company',
      country: 'country',
      projectDetails: 'details',
      consent: 'consent',
    });
  });

  it('accepts a complete inquiry and blocks honeypot submissions', () => {
    const complete = {
      ...values,
      fullName: 'Alex Morgan',
      businessEmail: 'alex@example.com',
      company: 'Example Brand',
      country: 'Germany',
      projectDetails: 'A complete project brief with enough detail to review.',
      consent: true,
    };
    expect(validateInquiry(complete, messages)).toEqual({});

    const honeypot = validateInquiry({ ...complete, website: 'spam' }, messages);
    expect(honeypot.website).toBe('spam');
  });
});