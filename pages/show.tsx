import React from "react";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
    const data :any= await res.json();
    return {
       props:{
        data: data.results,
       }
    };
};

export default function Show(props) {
    console.log(props)
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
        <h1>Found 2 results for "{id}"</h1>
        
    </div>
  );
}
