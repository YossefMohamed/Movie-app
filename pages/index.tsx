import type { NextPage } from "next";
import Head from "next/head";
import "tailwindcss/tailwind.css";

import Card from "../components/Card";
import CardSlider from "../components/CardSlider";
import Slider from "../components/Slider";
import { Pagination } from "../components/Pagination";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const data: any = await res.json();
  const resRecommend = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const dataRecommend: any = await resRecommend.json();
  return {
    props: {
      trendShows: data.results,
      pages: data.total_pages,
      recommended: dataRecommend.results,
    },
  };
};

const Home: NextPage<{ trendShows: any; pages: any; recommended: any }> = (
  props
) => {
  const router = useRouter();
  const currentPage = 1;
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="trending py-20 text-5xl">
        <h1>Trending</h1>
        <div className="overflow-hidden py-10">
          <div className=" justify-between flex-wrap gap-y-16 d-none d-lg-flex ">
            <Slider>
              {props.trendShows.map((show) => (
                <div
                  className="keen-slider__slide  number-slide1 "
                  key={show.id}
                >
                  <CardSlider
                    name={show.title}
                    image={show.backdrop_path}
                    id={show.id}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="justify-between flex-wrap gap-y-16 d-flex d-lg-none">
            <Slider perView={1.1}>
              {props.trendShows.map((show) => (
                <div
                  className="keen-slider__slide  number-slide1 "
                  key={show.id}
                >
                  <CardSlider
                    name={show.title}
                    image={show.backdrop_path}
                    id={show.id}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="recommended my-16 flex flex-col gap-11">
            <h1>Recommended for U</h1>
            <div className="flex flex-wrap gap-[2%] justify-start flex-row ">
              {props.recommended.map((show) => {
                return (
                  <div
                    className="w-[100%] md:w-[31%] my-1 md:my-6 "
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
        <Pagination
          onClick={(page) => router.push("/" + page)}
          currentPage={currentPage}
          next={() => {
            if (currentPage < props.pages) {
              return currentPage + 1;
            } else {
              return undefined;
            }
          }}
          prev={() => {
            if (currentPage !== 1) {
              return currentPage - 1;
            } else {
              return undefined;
            }
          }}
        />{" "}
      </div>
    </>
  );
};

export default Home;
