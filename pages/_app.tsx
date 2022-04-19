import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../layouts/Layout'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout >
     <div className="bg-primary-dark min-h-screen font-poppins text-text-dark">
     <div className=" flex justify-between gap-4  px-10">

<div className="w-fit min-h-screen p-4">
<Header />
  </div>
  <div className="flex-auto  p-4 my-4 ml-20">
  <Component {...pageProps} />

  </div>
    </div>
     </div>
    </Layout>
}

export default MyApp
