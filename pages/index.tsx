import type { NextPage } from "next";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import Card from "../components/Card";
import SearchInput from "../components/SearchInput";
import Slider from "../components/Slider";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div className="trending py-20 text-5xl">
        <h1>Trending</h1>
        <div className="overflow-hidden py-10">
          <div className="flex justify-between flex-wrap gap-y-16 ">
            <Slider />
          </div>
          <div className="recommended my-16 flex flex-col gap-11">
            <h1>Recommended for U</h1>
            <div className="flex flex-wrap gap-[2%] ">
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
              <div className="sm:w-[90%] md:w-[31%] w-[40%] my-10">
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
