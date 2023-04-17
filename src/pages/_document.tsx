import { Html, Head, Main, NextScript } from "next/document";
import i18nextConfig from "../../next-i18next.config";

export default function Document(props: {
  __NEXT_DATA__: { query: { locale: string } };
}) {
  const currentLocale =
    props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
