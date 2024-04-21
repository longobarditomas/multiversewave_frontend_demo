import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import React from 'react';
import UserState from '../context/User/UserState';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <UserState>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </UserState>
  );
}
