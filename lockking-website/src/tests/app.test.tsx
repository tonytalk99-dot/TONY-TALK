import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../App';

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

describe('LOCKKING site interactions', () => {
  it('switches the full page to Simplified Chinese without reloading', async () => {
    const user = userEvent.setup();
    renderApp('/');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SMART LOCKS.');
    await user.click(screen.getByRole('button', { name: '中文' }));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('智能门锁。');
    expect(
      within(screen.getByRole('navigation', { name: '主导航' })).getByRole('link', { name: '产品' }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe('zh-CN'));
    expect(document.title).toBe('LOCKKING | 智能门锁 OEM/ODM 制造商');
  });

  it('opens the mobile navigation and closes it with Escape', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const toggle = screen.getByRole('button', { name: 'Open navigation menu' });
    const panel = document.getElementById('mobile-navigation');
    expect(panel).toHaveAttribute('hidden');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('hidden');

    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('hidden');
    expect(toggle).toHaveFocus();
  });

  it('filters the catalog and restores all product directions', async () => {
    const user = userEvent.setup();
    renderApp('/products');

    expect(screen.getAllByRole('article')).toHaveLength(3);
    const slimFilter = screen.getByRole('button', { name: 'Slim Frame' });
    await user.click(slimFilter);

    expect(slimFilter).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Slim-Frame Smart Lock' })).toBeInTheDocument();
    expect(screen.getByText('Showing 1 product direction(s)')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('exposes keyboard-operable FAQ state', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const question = screen.getByRole('button', { name: /Can LOCKKING support private-label branding/ });
    expect(question).toHaveAttribute('aria-expanded', 'false');

    await user.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Branding, packaging, finish and product presentation/)).toBeVisible();
  });

  it('prefills product context from a catalog CTA query without exposing personal data', async () => {
    renderApp('/contact?intent=sample&product=slim-frame-smart-lock');

    expect(screen.getByText('Product direction: Slim-Frame Smart Lock')).toBeInTheDocument();
    expect(screen.getByLabelText('Product interest')).toHaveValue('slim');
  });

  it('validates required inquiry fields before any submission', async () => {
    const user = userEvent.setup();
    renderApp('/contact');

    await user.click(screen.getByRole('button', { name: 'Submit inquiry' }));

    expect(screen.getByText('Enter your full name.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid business email address.')).toBeInTheDocument();
    expect(screen.getByText('Consent is required before the inquiry can be submitted.')).toBeInTheDocument();
    expect(screen.queryByText('Inquiry received.')).not.toBeInTheDocument();
  });

  it('never reports success when the inquiry endpoint is not configured', async () => {
    const user = userEvent.setup();
    renderApp('/contact');

    await user.type(screen.getByLabelText(/Full name/), 'Alex Morgan');
    await user.type(screen.getByLabelText(/Business email/), 'alex@example.com');
    await user.type(screen.getByLabelText(/Company name/), 'Example Brand');
    await user.type(screen.getByLabelText(/Country \/ region/), 'Germany');
    await user.type(
      screen.getByLabelText(/Project details/),
      'We are evaluating a slim-frame smart lock for a residential project in Germany.',
    );
    await user.click(screen.getByRole('checkbox', { name: /I agree that LOCKKING/ }));
    await user.click(screen.getByRole('button', { name: 'Submit inquiry' }));

    expect(await screen.findByText(/Nothing was transmitted or stored/)).toBeInTheDocument();
    expect(screen.queryByText('Inquiry received.')).not.toBeInTheDocument();
  });

  it('renders distinct page titles and accessible headings for all required routes', async () => {
    const routes = [
      ['/products', 'Smart lock directions for real project requirements.'],
      ['/services', 'Build the collaboration around the project.'],
      ['/factory', 'A transparent approach to production confidence.'],
      ['/contact', 'Let’s Discuss Your Smart Lock Project.'],
      ['/privacy', 'Privacy notice draft.'],
    ];

    for (const [route, heading] of routes) {
      const view = renderApp(route);
      expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
      expect(document.title).not.toBe('');
      const metaDescription = document.head.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')?.length).toBeGreaterThan(20);
      view.unmount();
    }
  });

  it('provides a working not-found route', async () => {
    renderApp('/missing-page');
    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent('This page is not part of the current site.');
    expect(screen.getByRole('link', { name: 'Return to home' })).toHaveAttribute('href', '/');
  });
});