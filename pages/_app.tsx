import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lyrics App - Rapid API Project</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
