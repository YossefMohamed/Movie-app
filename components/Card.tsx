import { gql } from "@apollo/client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsBookmark } from "react-icons/bs";
import { MdMovie } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import client from "../apollo-client";
import { addToast } from "../redux/toasted";
import { login } from "../redux/user";

const Card: NextPage<{
  image: string;
  name: string;
  lang: string;
  date: string;
  id: number;
}> = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    user.savedMovies &&
      setSaved(
        !!user.savedMovies.filter((movie) => {
          return movie.movieID == props.id;
        }).length
      );
  }, [user]);
  const handleSavingMovie = async () => {
    if (!user.id) {
      dispatch(
        addToast({
          type: "error",
          message: "Please Login",
        })
      );
      return;
    }
    client
      .mutate({
        mutation: gql`
          mutation addSavedMovie(
            $movieName: String!
            $movieId: Int!
            $movieImage: String!
          ) {
            addSavedMovie(
              movieName: $movieName
              movieID: $movieId
              movieImage: $movieImage
            ) {
              id
              name
              email
              image
              updatedAt
              verified
              following
              createdAt
              favoriteMovies {
                movieName
                movieID
                movieImage
              }
              savedMovies {
                movieName
                movieID
                movieImage
              }
            }
          }
        `,
        variables: {
          movieName: props.name,
          movieId: props.id,
          movieImage: props.image,
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      })
      .then(({ data }) => {
        console.log(data.addSavedMovie);
        dispatch(login(data.addSavedMovie));
        dispatch(
          addToast({
            type: "success",
            message: "Movie Add To Saved List",
          })
        );
      })
      .catch((error) => {
        dispatch(
          addToast({
            type: "error",
            message: error.message,
          })
        );
      });
  };

  const handleRemoveSavedMovie = async () => {
    if (!user.id) {
      dispatch(
        addToast({
          type: "error",
          message: "Please Login",
        })
      );
      return;
    }
    client
      .mutate({
        mutation: gql`
          mutation RemoveSavedMovie($movieId: Int!) {
            removeSavedMovie(movieID: $movieId) {
              id
              name
              email
              image
              updatedAt
              verified
              createdAt
              following
              favoriteMovies {
                movieName
                movieID
                movieImage
              }
              savedMovies {
                movieName
                movieID
                movieImage
              }
            }
          }
        `,
        variables: {
          movieId: props.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      })
      .then(({ data }) => {
        dispatch(login(data.removeSavedMovie));
        dispatch(
          addToast({
            type: "success",
            message: "Movie Removed From Saved List",
          })
        );
      })
      .catch((error) => {
        dispatch(
          addToast({
            type: "error",
            message: error.message,
          })
        );
      });
  };

  return (
    <div className="py-5 flex flex-col font-poppins text-text-dark rounded-2xl opacity-95 hover:opacity-100 relative">
      <div className=" w-full z-0 h-[85%] rounded-xl overflow-hidden">
        <Image
          src={
            props.image
              ? "https://image.tmdb.org/t/p/w500/" + props.image
              : " https://i.ytimg.com/vi/np4n2DIOKVM/maxresdefault.jpg"
          }
          layout="responsive"
          width={350}
          height={400}
          objectFit="cover"
        />
      </div>
      <div
        className={`absolute right-10 top-10 p-5 ${
          saved && "bg-secondary-dark"
        } hover:bg-primary-dark text-4xl rounded-full cursor-pointer`}
        onClick={() => (saved ? handleRemoveSavedMovie() : handleSavingMovie())}
      >
        <span className="">
          <BsBookmark />
        </span>
      </div>
      <div className="p-5 mt-auto  flex-1">
        <h2 className="text-xl font-bold flex items-center gap-5 opacity-75">
          <div className="year">{new Date(props.date).getFullYear()}</div>
          <div className="type flex items-center gap-2">
            <MdMovie /> Movie
          </div>
          <div className="cat">{props.lang}</div>
        </h2>
        <Link href={`/show?id=${props.id}`}>
          <h1 className="text-4xl font-bold cursor-pointer">{props.name}</h1>
        </Link>
      </div>
    </div>
  );
};

export default Card;
