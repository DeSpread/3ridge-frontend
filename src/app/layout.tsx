import "@/styles/tailwindcss.css";
import "@/styles/globals.css";

import Header from "./(header)/header.layout";
import GlobalComponents from "./globalComponents";
import Providers from "./providers";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalComponents />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
