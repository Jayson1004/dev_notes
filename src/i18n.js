import {headers} from 'next/headers';
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './navigation';

export async function getLanguageFromIP(ip) {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=f1482b78a89f7b`);
    const data = await response.json();
    console.log(data,'data')
    if (data.country === 'CN') {
      return 'zh_CN';
    } else if (data.country === 'US') {
      return 'en_US';
    }

    // 处理其他情况或者返回默认语言
    return 'en_US';
  } catch (error) {
    // 处理请求出错的情况，返回默认语言
    console.error('Error fetching IP info:', error);
    return 'en_US';
  }
}

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale)) notFound();

  const now = headers().get('x-now');
  const timeZone = headers().get('x-time-zone') ?? 'Europe/Vienna';
  const langIp = headers().get('x-forwarded-for')
  const lang = await getLanguageFromIP(langIp)
  console.log(lang, 'lang')
  const messages = (await import(`./messages/${lang}.json`)).default;

  return {
    now: now ? new Date(now) : undefined,
    timeZone,
    messages,
    defaultTranslationValues: {
      globalString: 'Global string',
      highlight: (chunks) => <strong>{chunks}</strong>
    },
    formats: {
      dateTime: {
        medium: {
          dateStyle: 'medium',
          timeStyle: 'short',
          hour12: false
        }
      }
    },
    onError(error) {
      if (
        error.message ===
        (process.env.NODE_ENV === 'production'
          ? 'MISSING_MESSAGE'
          : 'MISSING_MESSAGE: Could not resolve `missing` in `Index`.')
      ) {
        // Do nothing, this error is triggered on purpose
      } else {
        console.error(JSON.stringify(error.message));
      }
    },
    getMessageFallback({key, namespace}) {
      return (
        '`getMessageFallback` called for ' +
        [namespace, key].filter((part) => part != null).join('.')
      );
    }
  };
});