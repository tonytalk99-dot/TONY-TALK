export interface InquiryFormValues {
  fullName: string;
  businessEmail: string;
  company: string;
  country: string;
  role: string;
  productInterest: string;
  quantity: string;
  timeline: string;
  collaboration: string;
  nda: boolean;
  projectDetails: string;
  consent: boolean;
  website: string;
}

export type InquiryField = keyof Pick<
  InquiryFormValues,
  'fullName' | 'businessEmail' | 'company' | 'country' | 'projectDetails' | 'consent' | 'website'
>;

export type InquiryErrors = Partial<Record<InquiryField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(values: InquiryFormValues, messages: Record<InquiryField, string>): InquiryErrors {
  const errors: InquiryErrors = {};

  if (values.fullName.trim().length < 2) errors.fullName = messages.fullName;
  if (!emailPattern.test(values.businessEmail.trim())) errors.businessEmail = messages.businessEmail;
  if (values.company.trim().length < 2) errors.company = messages.company;
  if (values.country.trim().length < 2) errors.country = messages.country;
  if (values.projectDetails.trim().length < 20) errors.projectDetails = messages.projectDetails;
  if (!values.consent) errors.consent = messages.consent;
  if (values.website.trim().length > 0) errors.website = messages.website;

  return errors;
}