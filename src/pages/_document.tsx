import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
