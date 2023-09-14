import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="min-h-screen" lang="en" dir="ltr">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="flex min-h-screen flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
