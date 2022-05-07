import React from "react";
import Card from "../../components/Card";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  const { keyword: id } = context.query;
  const res = await fetch(
    `http://api.tmdb.org/3/person/${id}?api_key=${process.env.API_KEY}&append_to_response=combined_credits`
  );

  const data: any = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
export default function Movies(props) {
  return (
    <div>
        <div className="tags-container">
            
        </div>
  
    </div>
  );
}
