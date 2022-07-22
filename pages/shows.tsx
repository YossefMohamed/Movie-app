import type { NextPage } from "next";
import Head from "next/head";
import "tailwindcss/tailwind.css";

import Card from "../components/Card";
import CardSlider from "../components/CardSlider";
import Slider from "../components/Slider";
import { Pagination } from "../components/Pagination";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const { cat = "all", page = 1 } = context.query;

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const found = genres.find(
    (genre) => genre.name.toLocaleLowerCase() === cat.toLocaleLowerCase()
  );

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.API_KEY
    }&with_genres=${found ? found.id : "all"}&page=${page}`
  );

  const data: any = await res.json();
  return {
    props: {
      pages: data.total_pages,
      recommended: data.results,
      genres,
    },
  };
};

const Shows: NextPage<{ pages: any; recommended: any; genres: any }> = (
  props
) => {
  const router = useRouter();
  const { cat = "all", page = 1 } = router.query;
  const currentPage = Number(page);

  return (
    <>
      <Head>
        <title>Shows</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="trending py-10 text-5xl">
        <div className="overflow-hidden ">
          <div className="recommended  flex flex-col gap-11">
            <div className="flex flex-wrap">
              <span
                onClick={() => {
                  router.push("/shows?cat=" + "all");
                }}
                className={`inline-flex items-center m-2 px-5 py-2 cursor-pointer ${
                  cat.toLowerCase() !== "alL".toLowerCase()
                    ? "bg-secondary-dark"
                    : "bg-gray-300"
                } hover:bg-gray-300  rounded-full text-xl font-semibold text-gray-600`}
              >
                <span className="ml-1">{"All".toUpperCase()}</span>
              </span>
              {props.genres.map((genre) => {
                if (genre.name === cat) {
                  return (
                    <span
                      onClick={() => {
                        router.push("/shows?cat=" + genre.name);
                      }}
                      key={genre.id}
                      className="inline-flex items-center m-2 px-5 py-2 cursor-pointer bg-gray-300 rounded-full text-xl font-semibold text-gray-600"
                    >
                      <span className="ml-1">{genre.name.toUpperCase()}</span>
                    </span>
                  );
                }
                return (
                  <span
                    onClick={() => {
                      router.push("/shows?cat=" + genre.name);
                    }}
                    key={genre.id}
                    className="inline-flex items-center m-2 px-5 py-2 bg-secondary-dark cursor-pointer hover:bg-gray-300 rounded-full text-xl font-semibold text-gray-600"
                  >
                    <span className="ml-1">{genre.name.toUpperCase()}</span>
                  </span>
                );
              })}
            </div>
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
          onClick={(page) =>
            router.push("/shows?cat=" + router.query.cat + "&page=" + page)
          }
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
        />
      </div>
    </>
  );
};

export default Shows;
