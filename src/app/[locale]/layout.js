
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextIntlClientProvider, useMessages } from 'next-intl';
export const metadata = {
  title: "WeAssistant",
  description: "WeAssistant",
};


export default function RootLayout( { children, params: {locale}, data }) {
  const messages = useMessages()
  // locale = getLanguageFromIP()
  // console.log(window&& window.navigator && navigator.language.split('_')[0], messages, locale)
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
