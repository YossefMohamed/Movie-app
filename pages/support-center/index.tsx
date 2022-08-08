import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import client from "../../apollo-client";
import Alert from "../../components/Alert";
import Post from "../../components/Post";
import { useRouter } from "next/router";
import { Rootstate } from "../../redux/store";
import { addToast } from "../../redux/toasted";
export default function SupportPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);
  const { id } = useSelector((state: Rootstate) => state.user.user);
  const [isUser, setIsUser] = React.useState(false);
  React.useEffect(() => {
    id ? setIsUser(true) : setIsUser(false);
  }, [id]);
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
    setDropDown(false);
    setError("");
    client
      .query({
        query: gql`
          query GetAllPosts($tag: String!, $sort: String, $following: Boolean) {
            getAllPosts(tag: $tag, sort: $sort, following: $following) {
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
          following: router.query.following
            ? router.query.following === "true"
              ? true
              : false
            : false,
          sort: router.query.sortBy ? router.query.sortBy : "createdAt",
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      })
      .then(({ data }) => {
        setLoading(false);
        console.log(data.getAllPosts);
        setPosts(data.getAllPosts);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [router.query, router.query.sortBy]);
  console.log(router.query.sortBy ? router.query.sortBy : "createdAt");
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
                    router.push({
                      pathname: "/support-center",
                      query: {
                        ...router.query,
                        tag: genre.name,
                      },
                    });
                  }}
                >
                  <span className="ml-1">{genre.name.toUpperCase()}</span>
                </span>
              );
            })}
          </div>

          <div className="flex gap-6 mb-12">
            <button
              onMouseEnter={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
              className="flex items-center relative bg-secondary-dark text-xl text-white font-bold py-3 px-10 rounded hover:button-secondary hover:bg-gray-600 "
            >
              Sort By
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
              {dropDown && (
                <ul className="dropdown absolute z-50 top-full left-0 bg-primary-dark rounded-xl flex flex-col justify-between">
                  <li>
                    <span
                      className="dropdown-item py-3 px-5 text-text-dark"
                      onClick={() => {
                        router.push({
                          pathname: "/support-center",
                          query: {
                            ...router.query,
                            sortBy: "top",
                          },
                        });
                      }}
                    >
                      Top
                    </span>
                  </li>
                  <li>
                    <span
                      className="dropdown-item py-3 px-5 text-text-dark"
                      onClick={() => {
                        router.push({
                          pathname: "/support-center",
                          query: {
                            ...router.query,
                            sortBy: "newest",
                          },
                        });
                      }}
                    >
                      Newest
                    </span>
                  </li>
                  <li>
                    <span
                      className="dropdown-item py-3 px-5 text-text-dark"
                      onClick={() => {
                        router.push({
                          pathname: "/support-center",
                          query: {
                            ...router.query,
                            sortBy: "oldest",
                          },
                        });
                      }}
                    >
                      oldest
                    </span>
                  </li>
                </ul>
              )}
            </button>

            {isUser && (
              <>
                {router.query.following !== "true" ? (
                  <button
                    onClick={() => {
                      router.push({
                        pathname: "/support-center",
                        query: {
                          ...router.query,
                          following: true,
                        },
                      });
                    }}
                    className="bg-secondary-dark text-xl text-white font-bold py-3 px-10 rounded  hover:button-secondary hover:bg-gray-600"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      router.push({
                        pathname: "/support-center",
                        query: {
                          ...router.query,

                          following: false,
                        },
                      });
                    }}
                    className="bg-secondary-dark text-xl text-white font-bold py-3 px-10 rounded  hover:button-secondary hover:bg-gray-600"
                  >
                    All Users
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => {
                if (isUser) router.push("/support-center/create");
                else
                  dispatch(
                    addToast({
                      type: "error",
                      message: "You must be logged in to create a post",
                    })
                  );
              }}
              className="bg-secondary-dark text-3xl font-bold rounded text-white py-3 px-3 hover:button-secondary hover:bg-gray-600"
            >
              <AiOutlinePlus />
            </button>
          </div>

          <div className="md:grid md:grid-cols-3 gap-4 auto-rows-auto">
            {posts.map((post) => (
              <span key={post.id}>
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
