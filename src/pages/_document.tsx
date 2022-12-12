import { Html, Head, Main, NextScript } from "next/document";

// console.log("aaa");
// console.log(process.env.NODE_ENV);

export default function Document() {
  return (
    <Html>
      <Head>
        {process.env.NODE_ENV === "production" && (
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests;"
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
