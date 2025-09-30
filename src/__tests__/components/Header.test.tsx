import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';

const messages = {
  header: {
    phone: '+971 50 123 4567',
    whatsapp: 'WhatsApp',
    languageSwitcher: 'Language',
  },
  whatsapp: {
    message: 'Hello!',
  },
};

const mockRouter = {
  push: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

describe('Header', () => {
  it('renders header with logo', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Alpha Star')).toBeInTheDocument();
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('displays phone number', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('+971 50 123 4567')).toBeInTheDocument();
  });

  it('has language switcher buttons', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('AR')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
  });
});
