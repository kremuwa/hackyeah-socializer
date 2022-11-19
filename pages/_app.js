import "../styles/globals.css";
import initAuth from "@/auth";

initAuth();
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <Toaster />
  </>;
}

export default MyApp;
