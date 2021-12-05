import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import Login from './login';
import { getCookie } from 'cookies-next';

function MyApp({ Component, pageProps }: AppProps) {

  if (!getCookie('username')) {
    return <Login />
  }

  return <Component {...pageProps} />
}

export default MyApp
