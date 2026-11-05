import { useId, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../data/site';
import { getProductDirection } from '../data/products';
import { formatTemplate } from '../lib/format';
import {
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryFormValues,
} from '../lib/validation';
import { InquiryNotConfiguredError, submitInquiry, type InquiryPayload } from '../lib/inquiry';
import StatusMessage from './StatusMessage';

type SubmitState =
  | { type: 'idle' }
  | { type: 'success' }
  | { type: 'error'; reason: 'not-configured' | 'generic' };

const emptyValues: InquiryFormValues = {
  fullName: '',
  businessEmail: '',
  company: '',
  country: '',
  role: '',
  productInterest: 'not-sure',
  quantity: 'not-sure',
  timeline: 'not-sure',
  collaboration: 'not-sure',
  nda: false,
  projectDetails: '',
  consent: false,
  website: '',
};

function buildInitialValues(productInterest: string, collaboration: string): InquiryFormValues {
  return {
    ...emptyValues,
    productInterest,
    collaboration,
  };
}

export default function InquiryForm() {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const product = getProductDirection(searchParams.get('product'));
  const rawIntent = searchParams.get('intent') ?? 'quote';
  const inquiryIntent = ['quote', 'sample', 'oem', 'odm', 'project'].includes(rawIntent) ? rawIntent : 'quote';
  const initialCollaboration = inquiryIntent === 'odm' ? 'odm' : inquiryIntent === 'oem' ? 'oem' : 'not-sure';
  const [values, setValues] = useState<InquiryFormValues>(() =>
    buildInitialValues(product?.category ?? 'not-sure', initialCollaboration),
  );
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ type: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseId = useId().replaceAll(':', '');
  const fieldIds: Record<InquiryField, string> = {
    fullName: `${baseId}-full-name`,
    businessEmail: `${baseId}-business-email`,
    company: `${baseId}-company`,
    country: `${baseId}-country`,
    projectDetails: `${baseId}-project-details`,
    consent: `${baseId}-consent`,
    website: `${baseId}-website`,
  };

  const updateField = <K extends keyof InquiryFormValues>(field: K, value: InquiryFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitState.type !== 'idle') setSubmitState({ type: 'idle' });
  };

  const errorId = (field: InquiryField) => (errors[field] ? `${fieldIds[field]}-error` : undefined);
  const describedBy = (field: InquiryField, hintId?: string) =>
    [errorId(field), hintId].filter(Boolean).join(' ') || undefined;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const messageMap: Record<InquiryField, string> = {
      fullName: t.contact.errors.fullName,
      businessEmail: t.contact.errors.businessEmail,
      company: t.contact.errors.company,
      country: t.contact.errors.country,
      projectDetails: t.contact.errors.projectDetails,
      consent: t.contact.errors.consent,
      website: t.contact.errors.honeypot,
    };
    const nextErrors = validateInquiry(values, messageMap);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.website) {
        setSubmitState({ type: 'error', reason: 'generic' });
        return;
      }
      const firstField = (Object.keys(nextErrors) as InquiryField[]).find((field) => field !== 'website');
      if (firstField) document.getElementById(fieldIds[firstField])?.focus();
      return;
    }

    const payload: InquiryPayload = {
      fullName: values.fullName.trim(),
      businessEmail: values.businessEmail.trim(),
      company: values.company.trim(),
      country: values.country.trim(),
      role: values.role,
      productInterest: values.productInterest,
      quantity: values.quantity,
      timeline: values.timeline,
      collaboration: values.collaboration,
      nda: values.nda,
      projectDetails: values.projectDetails.trim(),
      consent: true,
      productContextId: product?.id ?? null,
      inquiryIntent,
      language,
      source: 'lockking-website',
    };

    setIsSubmitting(true);
    setSubmitState({ type: 'idle' });

    try {
      await submitInquiry(payload);
      setSubmitState({ type: 'success' });
      setErrors({});
      setValues((current) => ({
        ...emptyValues,
        productInterest: current.productInterest,
        collaboration: current.collaboration,
      }));
    } catch (error) {
      setSubmitState({
        type: 'error',
        reason: error instanceof InquiryNotConfiguredError ? 'not-configured' : 'generic',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="inquiry-form-card" aria-labelledby={`${baseId}-form-title`}>
      <div className="inquiry-form-card__header">
        <span className="eyebrow">{t.contact.eyebrow}</span>
        <h2 id={`${baseId}-form-title`}>{t.contact.formTitle}</h2>
        <p id={`${baseId}-form-intro`}>{t.contact.formIntro}</p>
      </div>

      {!siteConfig.inquiryEndpoint ? (
        <div className="inquiry-form-card__notice">
          <StatusMessage kind="info" title={t.contact.noEndpointTitle}>
            <p>{t.contact.noEndpointBody}</p>
            {siteConfig.publicContactEmail ? (
              <p>
                {formatTemplate(t.contact.emailFallback, { email: siteConfig.publicContactEmail })}{' '}
                <a href={`mailto:${siteConfig.publicContactEmail}`}>{siteConfig.publicContactEmail}</a>
              </p>
            ) : null}
          </StatusMessage>
        </div>
      ) : null}

      {product ? (
        <div className="inquiry-context">
          <span>{t.contact.contextLabel}</span>
          <strong>{formatTemplate(t.contact.contextProduct, { product: product.name[language] })}</strong>
        </div>
      ) : null}

      {submitState.type === 'success' ? (
        <StatusMessage kind="success" title={t.contact.status.successTitle}>
          <p>{t.contact.status.successBody}</p>
        </StatusMessage>
      ) : null}

      {submitState.type === 'error' ? (
        <StatusMessage kind="error" title={t.contact.status.errorTitle}>
          <p>
            {submitState.reason === 'not-configured'
              ? `${t.contact.status.notConfiguredTitle} ${t.contact.status.notConfiguredBody}`
              : t.contact.status.retry}
          </p>
        </StatusMessage>
      ) : null}

      <form className="inquiry-form" noValidate onSubmit={handleSubmit} aria-describedby={`${baseId}-form-intro`}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor={fieldIds.fullName}>
              {t.contact.fields.fullName} <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldIds.fullName}
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={values.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              placeholder={t.contact.fields.fullNamePlaceholder}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={describedBy('fullName')}
            />
            {errors.fullName ? (
              <span className="field-error" id={`${fieldIds.fullName}-error`}>
                {errors.fullName}
              </span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor={fieldIds.businessEmail}>
              {t.contact.fields.businessEmail} <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldIds.businessEmail}
              name="businessEmail"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={values.businessEmail}
              onChange={(event) => updateField('businessEmail', event.target.value)}
              placeholder={t.contact.fields.businessEmailPlaceholder}
              aria-invalid={Boolean(errors.businessEmail)}
              aria-describedby={describedBy('businessEmail')}
            />
            {errors.businessEmail ? (
              <span className="field-error" id={`${fieldIds.businessEmail}-error`}>
                {errors.businessEmail}
              </span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor={fieldIds.company}>
              {t.contact.fields.company} <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldIds.company}
              name="company"
              type="text"
              autoComplete="organization"
              required
              value={values.company}
              onChange={(event) => updateField('company', event.target.value)}
              placeholder={t.contact.fields.companyPlaceholder}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy('company')}
            />
            {errors.company ? (
              <span className="field-error" id={`${fieldIds.company}-error`}>
                {errors.company}
              </span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor={fieldIds.country}>
              {t.contact.fields.country} <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldIds.country}
              name="country"
              type="text"
              autoComplete="country-name"
              required
              value={values.country}
              onChange={(event) => updateField('country', event.target.value)}
              placeholder={t.contact.fields.countryPlaceholder}
              aria-invalid={Boolean(errors.country)}
              aria-describedby={describedBy('country')}
            />
            {errors.country ? (
              <span className="field-error" id={`${fieldIds.country}-error`}>
                {errors.country}
              </span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor={`${baseId}-role`}>{t.contact.fields.role}</label>
            <select
              id={`${baseId}-role`}
              name="role"
              value={values.role}
              onChange={(event) => updateField('role', event.target.value)}
            >
              <option value="">{t.contact.selectPlaceholder}</option>
              <option value="brand-owner">{t.contact.roleOptions.brandOwner}</option>
              <option value="importer">{t.contact.roleOptions.importer}</option>
              <option value="distributor">{t.contact.roleOptions.distributor}</option>
              <option value="integrator">{t.contact.roleOptions.integrator}</option>
              <option value="other">{t.contact.roleOptions.other}</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor={`${baseId}-product-interest`}>{t.contact.fields.productInterest}</label>
            <select
              id={`${baseId}-product-interest`}
              name="productInterest"
              value={values.productInterest}
              onChange={(event) => updateField('productInterest', event.target.value)}
            >
              <option value="residential">{t.contact.interestOptions.residential}</option>
              <option value="commercial">{t.contact.interestOptions.commercial}</option>
              <option value="slim">{t.contact.interestOptions.slim}</option>
              <option value="not-sure">{t.contact.interestOptions.notSure}</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor={`${baseId}-quantity`}>{t.contact.fields.quantity}</label>
            <select
              id={`${baseId}-quantity`}
              name="quantity"
              value={values.quantity}
              onChange={(event) => updateField('quantity', event.target.value)}
            >
              <option value="not-sure">{t.contact.quantityOptions.notSure}</option>
              <option value="sample">{t.contact.quantityOptions.sample}</option>
              <option value="pilot">{t.contact.quantityOptions.pilot}</option>
              <option value="production">{t.contact.quantityOptions.production}</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor={`${baseId}-timeline`}>{t.contact.fields.timeline}</label>
            <select
              id={`${baseId}-timeline`}
              name="timeline"
              value={values.timeline}
              onChange={(event) => updateField('timeline', event.target.value)}
            >
              <option value="not-sure">{t.contact.timelineOptions.notSure}</option>
              <option value="0-3">{t.contact.timelineOptions.zeroThree}</option>
              <option value="3-6">{t.contact.timelineOptions.threeSix}</option>
              <option value="6-12">{t.contact.timelineOptions.sixTwelve}</option>
              <option value="12-plus">{t.contact.timelineOptions.twelvePlus}</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor={`${baseId}-collaboration`}>{t.contact.fields.collaboration}</label>
            <select
              id={`${baseId}-collaboration`}
              name="collaboration"
              value={values.collaboration}
              onChange={(event) => updateField('collaboration', event.target.value)}
            >
              <option value="oem">{t.contact.collaborationOptions.oem}</option>
              <option value="odm">{t.contact.collaborationOptions.odm}</option>
              <option value="both">{t.contact.collaborationOptions.both}</option>
              <option value="not-sure">{t.contact.collaborationOptions.notSure}</option>
            </select>
          </div>
        </div>

        <div className="checkbox-field">
          <input
            id={`${baseId}-nda`}
            name="nda"
            type="checkbox"
            checked={values.nda}
            onChange={(event) => updateField('nda', event.target.checked)}
          />
          <div>
            <label htmlFor={`${baseId}-nda`}>{t.contact.fields.nda}</label>
            <p>{t.contact.fields.ndaHint}</p>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor={fieldIds.projectDetails}>
            {t.contact.fields.projectDetails} <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={fieldIds.projectDetails}
            name="projectDetails"
            rows={6}
            required
            value={values.projectDetails}
            onChange={(event) => updateField('projectDetails', event.target.value)}
            placeholder={t.contact.fields.projectDetailsPlaceholder}
            aria-invalid={Boolean(errors.projectDetails)}
            aria-describedby={describedBy('projectDetails')}
          />
          {errors.projectDetails ? (
            <span className="field-error" id={`${fieldIds.projectDetails}-error`}>
              {errors.projectDetails}
            </span>
          ) : null}
        </div>

        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor={fieldIds.website}>{t.contact.fields.honeypot}</label>
          <input
            id={fieldIds.website}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => updateField('website', event.target.value)}
          />
        </div>

        <div className="checkbox-field checkbox-field--consent">
          <input
            id={fieldIds.consent}
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => updateField('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
          />
          <div>
            <label htmlFor={fieldIds.consent}>{t.contact.consent.label}</label>
            <Link className="inline-link" to="/privacy">
              {t.contact.consent.link}
            </Link>
            {errors.consent ? (
              <span className="field-error" id={`${fieldIds.consent}-error`}>
                {errors.consent}
              </span>
            ) : null}
          </div>
        </div>

        <button className="button button--primary inquiry-form__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="spinner" aria-hidden="true" size={18} />
              {t.contact.submitting}
            </>
          ) : (
            t.contact.submit
          )}
        </button>
      </form>
    </section>
  );
}