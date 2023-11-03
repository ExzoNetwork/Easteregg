import i18next from 'i18next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { defaultLanguage, languages } from '../i18n'

function Custom404() {
  const router = useRouter()
  const { asPath, query } = router

  // Detect current language
  const slug = asPath.split('/')[1]
  const langSlug = languages.includes(slug) && slug
  const isArr = Array.isArray(query.lang) ? query.lang[0] : query.lang;
  const language = isArr || langSlug || defaultLanguage;
  const [clientLanguage, setClientLanguage] = useState(null)

  useEffect(() => {
    setClientLanguage(language)
  }, [language])

  // Prevent `Text content does not match server-rendered HTML.`
  if (!clientLanguage) {
    return null
  }

  return (
    <>
      <Head>
        <title>
          {`${i18next.t('404', { ns: 'error' })} | ${i18next.t('title', {
            ns: 'meta',
          })}`}
        </title>
      </Head>
      <div>
        <>
          404 -{' '}
          {i18next.t('404', {
            ns: 'error',
          })}
        </>
      </div>
      <Link locale={language} href={language}>
        <a>/{language}</a>
      </Link>
    </>
  )
}

export default Custom404
