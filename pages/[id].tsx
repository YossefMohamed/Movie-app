import Head from "next/head";
import React from "react";
import SearchInput from "../components/SearchInput";
import Card from "../components/Card";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <div className="trending py-20 text-5xl">
        <h1>Found 2 results for "{id}"</h1>
        <div className="flex flex-wrap py-10 gap-[2%]">
          <div className="sm:w-[90%] md:w-[31%] w-[40%]">
            <Card />
          </div>
          <div className="sm:w-[90%] md:w-[31%] w-[40%]">
            <Card />
          </div>
          <div className="sm:w-[90%] md:w-[31%] w-[40%]">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
