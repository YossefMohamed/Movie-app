import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import client from "../../apollo-client";
import Alert from "../../components/Alert";
import Post from "../../components/Post";
import { useRouter } from "next/router";
export default function SupportPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();
  const genres = [
    { id: 0, name: "All" },

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
  useEffect(() => {
    setLoading(true);
    client
      .mutate({
        mutation: gql`
          query GetAllPosts($tag: String!) {
            getAllPosts(tag: $tag) {
              id
              content
              likes
              user {
                id
                name
                email
                image
              }
              createdAt
              updatedAt
              tag
              comments {
                post
                user {
                  id
                  name
                  email
                  image
                }
                id
                likes
                content
                createdAt
              }
            }
          }
        `,
        variables: {
          tag: router.query.tag ? router.query.tag : "all",
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setPosts(data.getAllPosts);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [router.query.tag]);

  return (
    <div className="py-10">
      {error ? <Alert type="danger" message={error} /> : null}
      {loading ? (
        <Alert type="info" message="Loading..." />
      ) : (
        <>
          <div className="my-10">
            {genres.map((genre) => {
              return (
                <span
                  key={genre.id}
                  className="inline-flex items-center m-2 px-5 py-2 bg-secondary-dark cursor-pointer hover:bg-gray-300 rounded-full text-xl font-semibold text-gray-600"
                  onClick={() => {
                    router.push("/support-center?tag=" + genre.name);
                  }}
                >
                  <span className="ml-1">{genre.name.toUpperCase()}</span>
                </span>
              );
            })}
          </div>

          <div className="flex gap-6 mb-12">
            <button className="bg-secondary-dark text-xl text-white font-bold py-3 px-10 rounded hover:button-secondary hover:opacity-75 ">
              Sort By
            </button>
            <button className="bg-secondary-dark text-xl text-white font-bold py-3 px-10 rounded  hover:button-secondary hover:opacity-75">
              Followers
            </button>
            <button className="bg-secondary-dark text-3xl font-bold rounded text-white py-3 px-3 hover:button-secondary hover:opacity-75">
              <AiOutlinePlus />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 auto-rows-auto">
            {posts.map((post) => (
              <span id={post.id}>
                <Post post={post} />
              </span>
            ))}
          </div>
          {posts.length === 0 ? (
            <Alert type="warning" message="No posts found" />
          ) : null}
        </>
      )}
    </div>
  );
}
