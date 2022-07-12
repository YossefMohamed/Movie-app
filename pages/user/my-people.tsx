import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import Alert from "../../components/Alert";
import client from "../../apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
export default function following(props) {
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    client
      .query({
        query: gql`
          query GetFollowing($type: String) {
            getFollowing(type: $type) {
              id
              name
              email
              image
              updatedAt
              verified
              createdAt
              deleted
              following
              favoriteMovies {
                movieName
                movieID
                movieImage
              }
            }
          }
        `,
        variables: {
          type: router.query.type,
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        console.log(res.data.getFollowing);

        setFollowing(res.data.getFollowing);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router.query]);

  return (
    <div className="my-10">
      {loading ? (
        <Alert type="info" message="Loading..." />
      ) : (
        <>
          {error && <Alert type="error" message={error} />}
          <div className="flex gap-6 mb-12">
            <button
              className={`${
                router.query.type?.toLowerCase() === "following"
                  ? "bg-red-400"
                  : "bg-secondary-dark"
              } text-2xl text-white font-bold py-3 px-10 rounded hover:button-secondary hover:opacity-75 `}
              onClick={() => {
                router.push("/user/my-people?type=following");
              }}
            >
              Following
            </button>
            <button
              className={`${
                router.query.type?.toLowerCase() === "followers"
                  ? "bg-red-400"
                  : "bg-secondary-dark"
              } bg-secondary-dark text-2xl text-white font-bold py-3 px-10 rounded  hover:button-secondary hover:opacity-75`}
              onClick={() => {
                router.push("/user/my-people?type=followers");
              }}
            >
              Followers
            </button>
          </div>
          <div className="my-10 grid grid-cols-4 gap-y-5 gap-4">
            {following.map((following) => {
              return <UserCard key={following.id} user={following} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
