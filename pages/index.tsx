import type { NextPage } from 'next'
import Head from 'next/head'
import "tailwindcss/tailwind.css"
import Card from '../components/Card'
import SearchInput from '../components/SearchInput'
import Slider from '../components/Slider'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <div className=''>
       <SearchInput />
     </div>
     <div className="trending py-20 text-5xl">
       <h1>Trending</h1>
       <div className="overflow-hidden py-10">
       {/* <Slider /> */}
      <div className="flex justify-between flex-wrap gap-y-16">
      <Card />
       <Card />
       <Card />
       <Card />
       <Card />
       <Card /><Card />
       <Card />
       <Card />
       <Card />
       <Card /> <Card />
       <Card />
       <Card /><Card />
       <Card />
       <Card />
       <Card />
       <Card /> <Card />
       <Card />
       <Card /><Card />
       <Card />
       <Card />
       <Card />
       <Card />
       <Card />
      </div>
       </div>
     </div>
    </div>
  )
}

export default Home
