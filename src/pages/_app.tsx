import { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import '../assets/css/custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
  const router = useRouter();
  const cookies = parseCookies(ctx);

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('url:' + url);
      // next push時の遷移検知
      if (url !== '/login' && url !== '/_error') {
        if (typeof cookies.auth === 'undefined') {
          console.log('in Next Router');
          router.push('/login');
        }
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const component =
    typeof pageProps === 'undefined' ? null : <Component {...pageProps} />;

  return component;
};

MyApp.getInitialProps = async (appContext: any) => {
  const cookies = parseCookies(appContext.ctx);
  if (
    appContext.ctx.pathname !== '/login' &&
    appContext.ctx.pathname !== '/_error'
  ) {
    if (typeof cookies.auth === 'undefined') {
      const isServer = typeof window === 'undefined';
      if (isServer) {
        console.log('in ServerSide');
        appContext.ctx.res.statusCode = 302;
        appContext.ctx.res.setHeader('Location', '/login');
        return {};
      } else {
        console.log('in ClientSide');
      }
    }
  }
  return {
    pageProps: {
      ...(appContext.Component.getInitialProps
        ? await appContext.Component.getInitialProps(appContext.ctx)
        : {}),
      pathname: appContext.ctx.pathname,
    },
  };
};

export default MyApp;
