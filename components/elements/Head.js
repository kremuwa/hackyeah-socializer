import Head from "next/head";

export const AppHead = ({ themeColor = "#61358a" }) => {
  return (
    <Head>
      <title>Socializer</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content={themeColor} />
      <link
        rel="preload"
        href="/fonts/AlfaSlabOne-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="true"
      ></link>
    </Head>
  );
};
