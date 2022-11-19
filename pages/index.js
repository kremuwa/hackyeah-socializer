import Head from "next/head";
import Link from "next/link";
import enableMessaging from "@/messaging/enableMessaging";

export default function Home({ data }) {
  //{data} is from getStaticProps() exported below.
  return (
    <div>
      <Head>
        <title>Next + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Hello World!
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
