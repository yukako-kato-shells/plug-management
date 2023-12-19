import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'firebase/auth';
import AuthProvider from '../util/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MediaQueryProvider } from '../util/mediaQuery';
import MenuProvider from '../util/menuContext';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <MediaQueryProvider>
      <MenuProvider>
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
      </MenuProvider>
    </MediaQueryProvider>
  )
}
