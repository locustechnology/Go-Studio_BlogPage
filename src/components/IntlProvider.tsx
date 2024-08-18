// src/components/IntlProvider.tsx
import { NextIntlClientProvider } from 'next-intl';
import getRequestConfig from '@/i18n'; // Adjust this based on your actual i18n setup

export default async function IntlProvider({ children, locale }: { children: React.ReactNode, locale: string }) {
  const { messages } = await getRequestConfig({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
