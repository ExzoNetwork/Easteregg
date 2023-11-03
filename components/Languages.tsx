import i18next from "i18next";
import { useRouter } from 'next/router';
import { languages } from '../i18n';
import ReactCountryFlag from "react-country-flag";

const Languages = () => {
    const { t } = i18next;
    const { asPath } = useRouter();

    // Detect current language
    const slug = asPath.split('/')[1]
    return (
        <div className="m-2 space-x-2">
            {languages.map(lang =>
                <a key={lang} href={lang}>
                    <ReactCountryFlag
                        className={`cursor-pointer hover:border-gray-700 border-transparent border-2 ${slug === lang ? 'border-red-200' : ''}`}
                        svg
                        alt="country-flags"
                        style={{
                            width: '3em',
                            height: '3em',
                        }}
                        countryCode={lang} />
                </a>
            )}
        </div>
    )

}

export default Languages;