import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // Prefetch all pages on hover
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Prefetch the next page
      router.prefetch(url)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (ctx) => {
  return {
    pageProps: {}
  }
}

export default MyApp
