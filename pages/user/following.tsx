import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import Alert from "../../components/Alert";
import client from "../../apollo-client";
import { gql } from "@apollo/client";

export default function following(props) {
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    client
      .query({
        query: gql`
          query GetFollowing {
            getFollowing {
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
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      })
      .then((res) => {
        setFollowing(res.data.getFollowing);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-10">
      {loading ? (
        <Alert type="info" message="Loading..." />
      ) : (
        <>
          {error && <Alert type="error" message={error} />}
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
