import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:url" content="https://3ridge.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="3ridge : Web3 온보딩 플랫폼" />
        <meta
          property="og:description"
          content="여러분의 웹3를 위한 여정, 웹3 온보딩 플랫폼 3ridge에 시작하세요"
        />
        <meta
          property="og:image"
          content="https://3ridge.s3.ap-northeast-2.amazonaws.com/opengraph/3ridge-opengraph.png"
        />
        <meta property="og:image:alt" content="3ridge : Web3 온보딩 플랫폼" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3ridge : Web3 온보딩 플랫폼" />
        <meta
          name="twitter:description"
          content="여러분의 웹3를 위한 여정, 웹3 온보딩 플랫폼 3ridge에 시작하세요"
        />
        <meta name="twitter:site" content="@3ridge_io" />
        <meta name="twitter:creator" content="@3ridge_io" />
        <meta
          name="twitter:image"
          content="https://3ridge.s3.ap-northeast-2.amazonaws.com/opengraph/3ridge-opengraph.png"
        />

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
