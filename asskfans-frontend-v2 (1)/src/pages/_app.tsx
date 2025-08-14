import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>AsskFans</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Tip the Ass King securely via Stripe Checkout." />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="AsskFans" />
      <meta property="og:description" content="Tip the Ass King securely via Stripe." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://asskfans.com" />
    </Head>
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  </>)
}
