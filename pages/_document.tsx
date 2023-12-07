import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preload' href='/fonts/LINESeedJP_OTF_Rg.woff2' as='font' type='font/woff2' crossOrigin='' />
          <link rel='preload' href='/fonts/LINESeedJP_OTF_Bd.woff2' as='font' type='font/woff2' crossOrigin='' />
          <link rel='stylesheet' href='/css/normalize.css' />
          <link rel='stylesheet' href='/css/style.css' />
          {process.env.NEXT_PUBLIC_ENVIRONMENT == 'staging' && <meta name="robots" content="noindex" />}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
          <link href='https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap' rel='stylesheet' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
