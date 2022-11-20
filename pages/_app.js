import "../styles/globals.css";
import initAuth from "@/auth";

initAuth();
import { Toaster } from 'react-hot-toast';
import {AppHead} from "@/elements/Head";

function MyApp({ Component, pageProps }) {
  return <>
    <AppHead/>
    <Component {...pageProps} />
    <Toaster />
  </>;
}

export default MyApp;
