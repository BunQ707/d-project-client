import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, Zoom } from 'react-toastify';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

NProgress.configure({ showSpinner: false });

const AuthProvider = dynamic<{ children: React.ReactNode }>(
  () => import('contexts/auth').then(({ AuthProvider }) => AuthProvider),
  {
    ssr: false,
  },
);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, []);

  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer
        position="bottom-left"
        hideProgressBar
        limit={2}
        newestOnTop
        closeButton={false}
        autoClose={2000}
        transition={Zoom}
      />
    </>
  );
}

export default MyApp;
