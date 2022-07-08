import { gql } from "@apollo/client";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import client from "../apollo-client";
import PostComment from "./PostComment";
import Tag from "./Tag";

// {
//   post: {
//     id: String;
//     content: String;
//     user: {
//       id: String;
//       name: String;
//       email: String;
//       image: String;
//     };
//     createdAt: String;
//     updatedAt: String;
//     tag: [String];
//   };
// }

function Post(props) {
  const [post, setPost] = useState(props.post);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state: any) => state.user);

  const onAddComment = async () => {
    if (!comment) return;
    const { data } = await client.mutate({
      mutation: gql`
        mutation AddCommentToPost($postId: String!, $content: String!) {
          addCommentToPost(postId: $postId, content: $content) {
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
              content
              createdAt
            }
          }
        }
      `,
      variables: {
        postId: post.id,
        content: comment,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    setPost(data.addCommentToPost);
    setComment("");
  };
  const onLikePost = async () => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation Mutation($postId: String!) {
          likePost(postId: $postId) {
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
              content
              createdAt
            }
          }
        }
      `,
      variables: {
        postId: post.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    setPost(data.likePost);
  };

  const onUnLikePost = async () => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation Mutation($postId: String!) {
          unLikePost(postId: $postId) {
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
              content
              createdAt
            }
          }
        }
      `,
      variables: {
        postId: post.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    setPost(data.unLikePost);
  };
  return (
    <article className="mb-4 break-inside p-6 rounded-xl bg-secondary-dark  flex flex-col bg-clip-border">
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-4" href="#">
            <img
              className="rounded-full max-w-none w-20 h-20"
              src={`https://avatars.dicebear.com/api/big-ears-neutral/${post.user.id}.svg`}
            />
          </a>
          <div className="flex flex-col justify-center">
            <div>
              <a
                className="inline-block text-2xl font-bold dark:text-white"
                href="#"
              >
                {post.user.name.toUpperCase()}
              </a>
            </div>
            <div className="text-slate-500  text-lg dark:text-slate-400">
              {moment(Number(post.createdAt)).format("MM-DD-YYYY")}
            </div>
          </div>
        </div>
      </div>
      <p className="text-3xl font-extrabold dark:text-white my-6">
        {post.content}
      </p>

      <div className="flex my-4">
        {post.tag.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>

      <div className="py-3">
        <div className="inline-flex items-center">
          <span className="mr-2">
            {post.likes.includes(user.id) ? (
              <svg
                className="fill-rose-600 dark:fill-rose-400 cursor-pointer"
                style={{ width: 24, height: 24 }}
                viewBox="0 0 24 24"
                onClick={onUnLikePost}
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
              </svg>
            ) : (
              <svg
                className="fill-rose-600 dark:fill-rose-400 cursor-pointer"
                style={{ width: 22, height: 22 }}
                viewBox="0 0 24 24"
                onClick={onLikePost}
              >
                <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"></path>
              </svg>
            )}
          </span>
          <span className="text-lg font-bold">{post.likes.length}</span>
        </div>
      </div>
      <div className="relative">
        <input
          className="pt-7 pb-7 pl-3 w-full h-11 bg-primary-dark rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
          type="text"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span className="flex absolute right-3 top-2/4 translate-y-[-50%] items-center">
          <svg
            className="mr-2"
            style={{ width: 20, height: 20 }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
            ></path>
          </svg>
          <svg
            className="fill-blue-500 dark:fill-slate-50 cursor-pointer"
            style={{ width: 20, height: 20 }}
            viewBox="0 0 24 24"
            onClick={onAddComment}
          >
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </span>
      </div>
      {/* Comments content */}
      <div className="pt-6">
        {post.comments.map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
      </div>
    </article>
  );
}

export default Post;
