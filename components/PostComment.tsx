import { gql } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import client from "../apollo-client";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/toasted";

function PostComment(props) {
  const [comment, setComment] = useState(props.comment);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const unLikeComment = async () => {
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
        mutation Mutation($commentId: String!) {
          unLikeComment(commentId: $commentId) {
            id
            content
            createdAt
            likes
            post
            user {
              id
              name
              email
            }
          }
        }
      `,
      variables: {
        commentId: comment.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    setComment(data.unLikeComment);
  };
  const likeComment = async () => {
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
        mutation Mutation($commentId: String!) {
          likeComment(commentId: $commentId) {
            id
            content
            createdAt
            likes
            post
            user {
              id
              name
              email
            }
          }
        }
      `,
      variables: {
        commentId: comment.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    setComment(data.likeComment);
    console.log(data.likeComment);
  };

  return (
    <div className="media flex pb-4">
      <a className="inline-block mr-4 mt-1" href="#">
        <img
          className="rounded-full max-w-none w-12 h-12"
          src={`https://avatars.dicebear.com/api/big-ears-neutral/${comment.user.id}.svg`}
        />
      </a>
      <div className="media-body">
        <div>
          <a className="inline-block text-xl font-bold mr-2" href="#">
            {comment.user.name}
          </a>
          <span className="text-slate-500 text-lg">25 minutes ago</span>
        </div>
        <p>{comment.content}</p>
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center py-2 mr-3">
            <span className="mr-2">
              {comment.likes.includes(user.id) ? (
                <svg
                  className="fill-rose-600 dark:fill-rose-400 cursor-pointer"
                  style={{ width: 24, height: 24 }}
                  viewBox="0 0 24 24"
                  onClick={unLikeComment}
                >
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                </svg>
              ) : (
                <svg
                  className="fill-rose-600 dark:fill-rose-400 cursor-pointer"
                  style={{ width: 22, height: 22 }}
                  viewBox="0 0 24 24"
                  onClick={likeComment}
                >
                  <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"></path>
                </svg>
              )}
            </span>
            <span className="text-base font-bold">{comment.likes.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
