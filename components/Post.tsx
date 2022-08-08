import { gql } from "@apollo/client";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import client from "../apollo-client";
import PostComment from "./PostComment";
import Tag from "./Tag";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/toasted";
import { useRouter } from "next/router";
import InputEmoji from "react-input-emoji";
import Link from "next/link";
import Image from "next/image";
function Post(props) {
  const [post, setPost] = useState(props.post);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();
  const onAddComment = async () => {
    if (!comment) return;
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
              likes
              id
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
              likes
              id
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
              likes
              id
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
          <Link href={`/user/${props.post.user.id}`}>
            <a className="inline-block mr-4">
              <Image
                width={40}
                height={40}
                className="rounded-full max-w-none"
                src={`https://avatars.dicebear.com/api/big-ears-neutral/${post.user.id}.svg`}
              />
            </a>
          </Link>
          <div className="flex flex-col justify-center">
            <div>
              <Link href={`/user/${props.post.user.id}`}>
                <a className="inline-block text-2xl font-bold dark:text-white">
                  {props.post.user.name}
                </a>
              </Link>
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
          <span
            key={tag}
            onClick={() => router.push("/support-center?tag=" + tag)}
          >
            <Tag name={tag} />
          </span>
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
      <InputEmoji
        cleanOnEnter
        borderRadius={5}
        placeholder="Write a comment"
        value={comment}
        onChange={(text) => setComment(text)}
        onEnter={onAddComment}
      />

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
