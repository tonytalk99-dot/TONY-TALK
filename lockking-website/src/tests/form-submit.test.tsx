import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { submitInquiry } from '../lib/inquiry';

vi.mock('../lib/inquiry', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/inquiry')>();
  return {
    ...actual,
    submitInquiry: vi.fn(),
  };
});

function renderContact() {
  return render(
    <MemoryRouter initialEntries={['/contact?intent=sample&product=slim-frame-smart-lock']}>
      <App />
    </MemoryRouter>,
  );
}

async function completeForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Full name/), 'Alex Morgan');
  await user.type(screen.getByLabelText(/Business email/), 'alex@example.com');
  await user.type(screen.getByLabelText(/Company name/), 'Example Brand');
  await user.type(screen.getByLabelText(/Country \/ region/), 'Germany');
  await user.type(
    screen.getByLabelText(/Project details/),
    'We are evaluating a slim-frame smart lock for a residential project in Germany.',
  );
  await user.click(screen.getByRole('checkbox', { name: /I agree that LOCKKING/ }));
  return user;
}

describe('inquiry form submission states', () => {
  beforeEach(() => {
    vi.mocked(submitInquiry).mockReset();
  });

  it('shows success only after the submission adapter resolves', async () => {
    vi.mocked(submitInquiry).mockResolvedValueOnce(undefined);
    renderContact();
    const user = await completeForm();

    await user.click(screen.getByRole('button', { name: 'Submit inquiry' }));

    expect(await screen.findByText('Inquiry received.')).toBeInTheDocument();
    expect(submitInquiry).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'Alex Morgan',
        businessEmail: 'alex@example.com',
        productContextId: 'slim-frame-smart-lock',
        inquiryIntent: 'sample',
        consent: true,
        source: 'lockking-website',
      }),
    );
  });

  it('shows a retryable error when the adapter fails', async () => {
    vi.mocked(submitInquiry).mockRejectedValueOnce(new Error('network'));
    renderContact();
    const user = await completeForm();

    await user.click(screen.getByRole('button', { name: 'Submit inquiry' }));

    expect(await screen.findByText('Inquiry not sent.')).toBeInTheDocument();
    expect(screen.getByText('Review the form and try again.')).toBeInTheDocument();
    expect(screen.queryByText('Inquiry received.')).not.toBeInTheDocument();
  });
});