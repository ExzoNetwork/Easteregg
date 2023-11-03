import { Head, Html, Main, NextScript } from 'next/document';
import { FAVICON_LOGO_16, FAVICON_LOGO_32 } from '../global-config';

export default function Document() {

    return (
        <Html>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="theme-color" content="#4b50e6" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href={FAVICON_LOGO_32} />
                <link rel="icon" type="image/png" sizes="16x16" href={FAVICON_LOGO_16} />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}