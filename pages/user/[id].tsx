import React from "react";
import Card from "../../components/Card";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

export const getServerSideProps = async (context) => {
 try {
    const { id } = context.query;
    let userData;

    const { data } = await client
    .query({
      query: gql`
        query Query($getUserId: String!) {
  getUser(id: $getUserId) {
    id
    name
    email
    image
    updatedAt
    verified
    createdAt
    favoriteMovies {
      movieName
      movieID
      movieImage
    }
  }
}
      `,
      variables :{
        getUserId : id
      }
    })

    return {
        props: {
          data:data.getUser,
        },
      };
 } catch (error) {
    return {
        redirect: {
          permanent: false,
          destination: "/shows",
        },
      };
 }
 
  
};
export default function User(props) {
  return (
    <div>
      <div className="trending py-20 text-5xl">
        <div className="profile-page">
          <div className="profile-pic"></div>
          <div className="title">
            <div className=" flex justify-center rounded-3xl overflow-hidden w-fit m-auto">
              <Image
                src={`https://avatars.dicebear.com/api/big-ears-neutral/${props.data.id}.svg`}
                width={250}
                height={300}
                objectFit="cover"
              />
            </div>
            <div className="name text-center  my-16">{props.data.name.toUpperCase()}</div>
          </div>
          <div className="text-6xl font-bold">Favorite Movies:</div>
          <div className="flex flex-wrap gap-[2%]">
            {props.data.favoriteMovies.length &&
              props.data.favoriteMovies.map((item, idx) => {
                if (idx < 20) {
                  return (
                    <div
                      className="sm:w-[90%] md:w-[31%] w-[40%] my-10"
                      key={item.id}
                    >
                        <Card
                        image={item.movieImage}
                        name={item.movieName}
                        date={"2022"}
                        lang={"EN"}
                        id={item.movieID}
                        />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
