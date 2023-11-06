import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'firebase/auth';
import AuthProvider from '../util/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <Component {...pageProps} />
      </>
    </AuthProvider>
  )
}
