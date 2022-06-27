import React from "react";
import { useRouter } from "next/router";
import client from "../apollo-client";
import { gql } from "@apollo/client";

import Card from "../components/Card";
import { Pagination } from "../components/Pagination";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastedSlice } from "../redux/toasted";
import Alert from "../components/Alert";



export default function Favorite(props) {
  const router = useRouter();
  const [results , setResults] = useState([]);
  const [loading , setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    client
  .query({
    query: gql`
      query getFavoriteMovies{
          getFavoriteMovies {
    movieName
    movieID
    movieImage
}
      }
    `,
    context : {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }
  })
  .then(({ data }) => {
    setResults(data.getFavoriteMovies)
    setLoading(false)

  })
  },[])
  
  return (
    <div>
      {
        loading ?   <div className="py-20"><Alert type="info" message="Loading..."></Alert> </div>: results.length? (
          <>
          <div className="trending py-20 text-5xl">
        <h1>
          There're {results.length} Movies in Your Favorites : 
        </h1>
      </div>
      <div className="flex flex-wrap gap-[2%] justify-start flex-row ">
        {/* {image : string; name : string ; lang:string ; date : string ; id:number } */}
        {results.map((item) => {
          return (
          <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10" key={item.id}>
            <Card
              image={item.movieImage}
              name={item.movieName}
              date={"2022"}
              lang={"EN"}
              id={item.movieID}
            />
          </div>
        )})}
      </div>
      <div className="pagination  w-full">
        <Pagination />
      </div>
          </>
        ) : <>
          <div className="trending py-20 text-5xl">

        <h1>
         You Have No Favorite Movies
        </h1>
        </div>
        </>
      }
    </div>
  );
}
