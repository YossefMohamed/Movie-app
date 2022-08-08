import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import client from "../../apollo-client";
import Alert from "../../components/Alert";
import Post from "../../components/Post";
import Tag from "../../components/Tag";
import { addToast } from "../../redux/toasted";
import { useRouter } from "next/router";
export default function Create(props) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [appear, setAppear] = useState(false);
  const genres = [
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
    setSuggestions(
      genres.filter((genre) => {
        if (
          genre.name.toLowerCase().includes(tag.toLowerCase()) &&
          tag.length > 0 &&
          !tags.includes(genre.name)
        ) {
          return genre.id;
        }
      })
    );
  }, [tag]);
  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };
  const addTag = (tag) => {
    setTags([...tags, tag.toLowerCase()]);
    setTag("");
  };
  const onClickCreate = async (e) => {
    e.preventDefault();
    if (!user.id) {
      dispatch(
        addToast({
          type: "error",
          message: "Please Login",
        })
      );
      return;
    }
    setError("");
    setAppear(false);
    if (tags.length === 0) {
      setError("Please Select At Least One Tag");
      return;
    }
    if (content.length === 0) {
      setError("Please Write Something");
      return;
    }
    const { data } = await client.mutate({
      mutation: gql`
        mutation Mutation($content: String!, $tag: [String]!) {
          addPost(content: $content, tag: $tag) {
            id
            content
            user {
              image
              name
              id
            }
            createdAt
            updatedAt
            tag
          }
        }
      `,
      variables: {
        content,
        tag: tags,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    router.push("/support-center");
  };
  return (
    <div className="my-20">
      <div className="text-5xl font-bold">Create A Post : </div>
      <form className="my-20 flex flex-col">
        {error && <Alert type="danger" message={error} />}

        <div className="text-4xl font-bold">Post Content : </div>
        <textarea
          className="my-10 w-full bg-secondary-dark py-5 px-10 outline-none text-3xl h-48"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="text-4xl font-bold mt-10">Post Tages : </div>

        <div className="flex flex-col justify-start">
          <input
            className="mt-10 w-full bg-secondary-dark py-5 px-10 outline-none text-3xl"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              setAppear(true);
            }}
          />

          {appear && suggestions.length ? (
            <div className="drop-down border-y border-primary-dark py-3 px-3 bg-secondary-dark">
              {suggestions.map((suggestion) => (
                <div
                  className="py-2 px-10"
                  id={suggestion.id}
                  onClick={() => {
                    addTag(suggestion.name);
                  }}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex mt-3">
          {tags.map((tag) => (
            <span className="mr-3" onClick={() => removeTag(tag)}>
              <Tag name={tag} />
            </span>
          ))}
        </div>

        <button
          className="my-10  bg-secondary-dark py-5 px-10 outline-none text-3xl w-fit"
          onClick={onClickCreate}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
