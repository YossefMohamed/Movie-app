import type { NextPage } from "next";
import Head from "next/head";
import "tailwindcss/tailwind.css";

import Card from "../components/Card";
import CardSlider from "../components/CardSlider";
import Slider from "../components/Slider";
import { Pagination } from "../components/Pagination";
import { useRouter } from "next/router";




export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${id}`
  );
  const data: any = await res.json();
  return {
    props: {
      pages: data.total_pages,
      recommended: data.results,
    },
  };
};

const Home: NextPage<{ pages: any; recommended: any }> = (
  props
) => {
const router = useRouter()
const { id=1} = router.query;
const currentPage = Number(id)
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="trending py-10 text-5xl">
           
        <div className="overflow-hidden py-20">

          <div className="recommended  flex flex-col gap-11">
            <h1>Recommended for U</h1>
            <div className="flex flex-wrap gap-[2%] justify-start flex-row ">
              {props.recommended.map((show) => {
                return (
                  <div
                    className="sm:w-[90%] md:w-[31%] w-[40%] my-10"
                    key={show.id}
                  >
                    <Card
                      image={show.poster_path}
                      name={show.title}
                      date={show.release_date}
                      lang={show.original_language}
                      id={show.id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pagination onClick={(page) => router.push('/'+page)} currentPage={currentPage} next={() => {
          if(currentPage < props.pages){
            return currentPage+1
          }else{
           return undefined
          }}}
          prev={() => {
            if(currentPage !== 1){
                return currentPage-1
            }else{
              return undefined
            }
          }}
          />
      </div>
    </>
  );
};

export default Home;
