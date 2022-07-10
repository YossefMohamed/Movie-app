import React from "react";
import Card from "../../components/Card";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user";
import { addToast } from "../../redux/toasted";
export const getServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    const { data } = await client.query({
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
        getUserId: id,
      },
    });
    console.log(data.getUser);
    return {
      props: {
        data: data.getUser,
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
  const [userData, setUserData] = useState(props.data);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  const followUser = async (e) => {
    if (!user.id) {
      dispatch(
        addToast({
          type: "error",
          message: "Please Login",
        })
      );
      return;
    }
    const { data } = await client.mutate({
      mutation: gql`
        mutation Mutation($followingId: String!) {
          followUser(followingId: $followingId) {
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
            savedMovies {
              movieName
              movieID
              movieImage
            }
            following
            deleted
          }
        }
      `,
      variables: {
        followingId: userData.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    console.log(data.followUser);
    dispatch(login(data.followUser));
  };

  const unFollowUser = async (e) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UnFollowUser($followingId: String!) {
          unFollowUser(followingId: $followingId) {
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
            savedMovies {
              movieName
              movieID
              movieImage
            }
            deleted
            following
          }
        }
      `,
      variables: {
        followingId: userData.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });

    dispatch(login(data.unFollowUser));
  };

  return (
    <div>
      <div className="trending py-20 text-5xl">
        <div className="profile-page">
          <div className="profile-pic"></div>
          <div className="title">
            <div className=" flex justify-center rounded-3xl overflow-hidden w-fit m-auto">
              <Image
                src={`https://avatars.dicebear.com/api/big-ears-neutral/${userData.id}.svg`}
                width={250}
                height={300}
                objectFit="cover"
              />
            </div>
            <div className="name text-center  my-16">
              {userData.name.toUpperCase()}
            </div>
            <div className="flex gap-6 justify-center my-12">
              <button className="bg-secondary-dark text-xl text-white font-bold py-3 px-10 rounded hover:button-secondary hover:opacity-75 ">
                Block
              </button>
              {user.id ? (
                !user.following.includes(userData.id) ? (
                  <button
                    onClick={followUser}
                    className="bg-green-600 text-xl text-white font-bold py-3 px-10 rounded  hover:button-secondary hover:opacity-75"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={unFollowUser}
                    className="bg-red-600 text-xl text-white font-bold py-3 px-10 rounded  hover:button-secondary hover:opacity-75"
                  >
                    Unfollow
                  </button>
                )
              ) : (
                <button
                  onClick={followUser}
                  className="bg-green-600 text-xl text-white font-bold py-3 px-10 rounded  hover:button-secondary hover:opacity-75"
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="text-6xl font-bold">Favorite Movies:</div>
          <div className="flex flex-wrap gap-[2%]">
            {userData.favoriteMovies.length &&
              userData.favoriteMovies.map((item, idx) => {
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
