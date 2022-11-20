import SplashScreen from "../components/elements/SplashScreen";

export default function Home() {
    //{data} is from getStaticProps() exported below.
    return (
        <div>
            <main>
                <SplashScreen/>
            </main>
        </div>
    );
}

export async function getStaticProps(context) {
    //Note: Do not use client functions here!

    //getDoc function is from Admin SDK.
    const data = await import("@/FS-admin-functions").then(({getDoc}) =>
        getDoc()
    );

    return {
        props: {data}, // will be passed to the page component as props
    };
}
