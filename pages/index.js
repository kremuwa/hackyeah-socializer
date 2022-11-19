import Head from "next/head";
import Link from "next/link";
import SplashScreen from "../components/elements/SplashScreen";;
import enableMessaging from "@/messaging/enableMessaging";

export default function Home({ data }) {
  //{data} is from getStaticProps() exported below.
  return (
    <div>
      <Head>
        <title>Socializer</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" href="/fonts/Zorque-Regular.woff2" as="font" type="font/woff2" crossorigin></link>
      </Head>

      <main>
        <SplashScreen />
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  //Note: Do not use client functions here!

  //getDoc function is from Admin SDK.
  const data = await import("@/FS-admin-functions").then(({ getDoc }) =>
    getDoc()
  );

  return {
    props: { data }, // will be passed to the page component as props
  };
}
