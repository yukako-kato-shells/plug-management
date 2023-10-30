import { useEffect, useState } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import AuthProvider from '../util/authContext';

export default function App({ Component, pageProps }: AppProps) {


  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
