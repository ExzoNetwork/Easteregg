import i18next from 'i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { getAllLanguageSlugs, getLanguage } from '../../i18n';
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { CheckIcon } from '@heroicons/react/20/solid';

import Languages from '../../components/Languages';

import { AIRDROP_IMAGE, LOGO } from '../../global-config';
import '../../styles/Home.module.css';
import CountDown from '../../components/CountDown';
import Success from '../../components/Success';
import Third from '../../components/ThirdForm';
import Second from '../../components/SecondForm';
import First from '../../components/FirstForm';
export default function LangIndex({ language }) {
  const { t } = i18next
  const [airdropFinished, setAirdropFinished] = useState(false);
  const router = useRouter()

  const title = t('page.home.head.title');
  const metaDescription = t('page.home.meta.description');
  const stepText = t('general.step');
  const airdropEndText = t('airdrop.end.text') as string[];
  const participateText = t('page.home.participate.text') as string[];

  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState({
    full_name: "",
    email: "",
    telegram_username: "",
    twitter_username: "",
    country: "",
    wallet_address: "",
  });

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/' + i18next.language.substring(0, 2))
    }
  })

  const navigation = [
    { name: 'Home', href: 'https://exzo.network' },
    { name: 'Developer Docs', href: 'https://docs.exzo.network' },
    { name: 'Twitter', href: 'https://twitter.com/Exzo_Network' },
    { name: 'Telegram', href: 'https://t.me/Exzo_Network' },
  ]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(process.env.NEXT_PUBLIC_AIRDROP_SUBMIT_API as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      setLoading(false);
      setActivePage(4);
    } catch {
      setError(
        t('error.submit.text')
      );
      console.log("error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      state.full_name &&
      state.email &&
      state.telegram_username &&
      state.country &&
      state.wallet_address
    ) {
      handleSubmit();
    }
  }, [state]);

  return (
    <div className="relative isolate pt-14">
    <svg
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width={100}
          height={100}
          x="100%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
    </svg>
      <header className="absolute drop-shadow-xl inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Exzo Network</span>
                <img
                  className="h-6 w-80"
                  src="https://raw.githubusercontent.com/ExzoNetwork/Exzo-Network-branding-assets/47d1777a03a858abed519954b85e371e48bae300/full-logo-svg/Logo-black.svg"
                  alt=""
                />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed shadow-xl inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="@/public/black-logo.svg"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                   Website
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <nav className='sm:hidden'>
        <div className='absolute w-full top-0 inset-x-0 text-white text-xs leading-4'>
          <Languages />
        </div>
      </nav>
      <div className="min-h-screen mt-10 w-screen flex items-center justify-center flex py-12 from-primary via-warn to-error">
      <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#0139FF" />
                  <stop offset={1} stopColor="#00FFA3" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
       <div className="rounded-xl bg-gray-900/5 p-2 ring-1 shadow-2xl ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
        <div className="h-full rounded-xl p-2 ring-1 ring-inset bg-white/90 backdrop-blur-xl ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 mx-auto overflow-hidden rounded-lg shadow-3xl">
            <div className="sm:h-auto hidden items-center sm:block overflow-hidden">
              <div className='absolute top-0 inset-x-0 text-white text-xs leading-4'>
              </div>
            </div>
            <div className="flex items-center rounded-md shadow-2xl ring-1 ring-gray-900/10 justify-center p-5">
              <div className="w-full">
              <iframe
                  src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xc8E190F8eB336177b8aDf8d3BB59965E1CEbb80D&chain=%7B%22name%22%3A%22Exzo+Network%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fevm.exzo.network%2F%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22XZO%22%2C%22name%22%3A%22XZO%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22exzonetwork%22%2C%22chainId%22%3A1229%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22exzonetwork%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcmvXVzoVkQ28jNehMFbKZCv41X3LPcPud7vNC2EHW624%2FExzo-square-white-bg1080x1080.png%22%2C%22width%22%3A50%2C%22height%22%3A50%2C%22format%22%3A%22%22%7D%7D&clientId=5440f143071c8f5410b9bf790f80855b&theme=light&primaryColor=blue"
                  width="600px"
                  height="600px"
              ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang)
  return {
    props: {
      language,
    },
  }
}
