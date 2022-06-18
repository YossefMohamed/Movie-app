import Image from "next/image";
import React from "react";
import { BsBookmark } from "react-icons/bs";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query ExampleQuery {
        _
      }
    `,
  });

  return {
    props: {
      user: data,
    },
  };
}
export default function Login(props) {
  console.log(props);
  return (
    <div className="py-20">
      <div className="info py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Name</div>
          <input
            type="text"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Yossef"
          />
        </div>{" "}
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Password</div>
          <input
            type="password"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Your Password"
          />
        </div>{" "}
        <div className="btn w-fit bg-secondary-dark px-16 py-5 font-bold text-3xl hover:bg-button-primary hover:text-text-dark">
          Submit
        </div>
      </div>
    </div>
  );
}
