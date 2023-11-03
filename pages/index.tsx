import i18next from 'i18next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/Home.module.css';

const Home: NextPage = () => {

  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/' + i18next.language.substring(0, 2))
    }
  })

  return (
    <>

    </>
  );
}

export default Home;