function Error({ statusCode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-cursive text-4xl text-white mb-4">
          {statusCode ? `Error ${statusCode}` : 'Something went wrong'}
        </h1>
        <p className="text-white/60 mb-8">Please try again later 💝</p>
        <a href="/" className="px-6 py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full">
          Go Home
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
