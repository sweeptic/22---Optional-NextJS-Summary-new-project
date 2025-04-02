import '../styles/globals.css';
import MainNavigation from '../components/layout/MainNavigation';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainNavigation />
      <Component {...pageProps} />)
    </>
  );
}

export default MyApp;
