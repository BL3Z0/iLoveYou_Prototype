import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// Disable static generation for all pages
MyApp.getInitialProps = async (ctx) => {
  return {
    pageProps: {}
  }
}

export default MyApp
