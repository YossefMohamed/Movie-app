import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import Card from "../components/Card";
import SearchInput from "../components/SearchInput";
import Slider from "../components/Slider";

export const getServerSideProps = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const data :any= await res.json();

  const resRecommend = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const dataRecommend :any= await resRecommend.json();
  return {
    props: {
      trendShows: data.results,
      pages : data.total_pages,
      recommended : dataRecommend.results

    },
  };
};

const Home: NextPage<{trendShows : any ; page:any ; recommended : any}> = (props) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div className="trending py-20 text-5xl">
        <h1>Trending</h1>
        <div className="overflow-hidden py-10">
          <div className="flex justify-between flex-wrap gap-y-16 ">
            <Slider trendShows={props.trendShows} />
          </div>
          <div className="recommended my-16 flex flex-col gap-11">
            <h1>Recommended for U</h1>
            <div className="flex flex-wrap gap-[2%] justify-start flex-row ">
              {props.recommended.map(show => {

return (
  <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10" key={show.id}>
    {console.log(show)}
    <Card image={show.poster_path} name={show.title} date={show.release_date} lang={show.original_language} id={show.id} />
  </div>
);
})}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
