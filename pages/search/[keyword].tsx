import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import { Pagination } from "../../components/Pagination";

export const getServerSideProps = async (context) => {
  const { keyword: id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-U&query=${id}&page=1&include_adult=false`
  );
  console.log(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-U&query=${id}&page=1&include_adult=true`
  );
  const data: any = await res.json();
  return {
    props: {
      results: data.results,
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    },
  };
};
export default function Search(props) {
  const router = useRouter();
  const { keyword: id } = router.query;
  return (
    <div>
      <div className="trending py-20 text-5xl">
        <h1>
          There're {props.totalResults} Results For{" "}
          <span className="font-bold italic">{id}</span>
        </h1>
      </div>
      <div className="flex flex-wrap gap-[2%] justify-start flex-row ">
        {/* {image : string; name : string ; lang:string ; date : string ; id:number } */}
        {props.results.map((item) => (
          <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10" key={item.id}>
            <Card
              image={item.poster_path}
              name={item.original_title}
              date={item.release_date}
              lang={item.original_language}
              id={item.id}
            />
          </div>
        ))}
      </div>
      {/* <div className="pagination  w-full">
        <Pagination />
      </div> */}
    </div>
  );
}
