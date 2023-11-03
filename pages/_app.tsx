import i18next from 'i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { defaultLanguage, languages } from '../i18n';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { asPath, query } = router;

  // Detect current language
  const slug = asPath.split('/')[1];
  const langSlug = languages.includes(slug) && slug;
  const isArr = Array.isArray(query.lang) ? query.lang[0] : query.lang;
  const language = isArr || langSlug || defaultLanguage;

  const [clientLanguage, setClientLanguage] = useState(language)

  useEffect(() => {
    setClientLanguage(language)
  }, [language])

  // Don't trigger `i18next.changeLanguage()` on root folder, use `router` to redirect to the specific language
  if (asPath !== '/' && asPath !== '/404') {
    i18next.changeLanguage(clientLanguage);
  }

  return (
    <Component {...pageProps} />
  );
}
export default App;
