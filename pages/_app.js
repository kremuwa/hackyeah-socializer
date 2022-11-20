import "../styles/globals.css";
import initAuth from "@/auth";

initAuth();
import { Toaster } from 'react-hot-toast';
import { AppHead } from "@/elements/Head";

function MyApp({ Component, pageProps }) {
  return <>
    <AppHead />
    <Component {...pageProps} />
    <Toaster toastOptions={
      {
        duration: 2000
      }
    } />
  </>;
}

export default MyApp;
