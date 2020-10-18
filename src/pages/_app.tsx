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
    // 認証機能
    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (url !== '/login' && url !== '/_error') {
        if (typeof cookies.auth === 'undefined') {
          // Have SSR render bad routes as a 404.
          window.location.href = '/login';
          return false;
        }
      }
      return true;
    });
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
