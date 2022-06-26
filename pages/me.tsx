import Image from "next/image";
import React from "react";
import { BsBookmark } from "react-icons/bs";
import { gql } from "@apollo/client";
import client from "./../apollo-client";

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
export default function ME(props) {
  console.log(props);
  return (
    <div className="py-20">
      <div className="flex justify-start gap-20 items-stretch ">
        <div>
          <Image
            src="data:image/jpeg;base64,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"
            alt="Picture of the author"
            width={100}
            className="rounded-xl"
            height={100}
          />
        </div>
        <div className="items-stretch flex flex-col justify-center gap-4">
          <div className="text-6xl font-bold ">Yossef Mohamed</div>
          <div className="info flex items-center  gap-3 text-2xl ">
            <BsBookmark /> <div className="number">50</div> Bookmarked Movies
          </div>
        </div>
      </div>
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
          <div className="name text-3xl font-bold">Last Name</div>
          <input
            type="text"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Mohamed"
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
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Confirm Password</div>
          <input
            type="password"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Confirm Your Password"
          />
        </div>
        <div className="btn w-fit bg-secondary-dark px-16 py-5 font-bold text-3xl hover:bg-button-primary hover:text-text-dark">
          Submit
        </div>
      </div>
    </div>
  );
}
