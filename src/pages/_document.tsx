import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="3ridge" />
        <meta property="og:description" content="3ridge : Web3 온보딩 플랫폼" />
        <meta property="og:url" content="https://www.3ridge.io" />
        <meta
          property="og:image"
          content="https://3ridge.s3.ap-northeast-2.amazonaws.com/thumb/3ridge-opengraph.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
