import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BsBookmark } from "react-icons/bs";
import { MdMovie } from "react-icons/md";

const CardSlider: NextPage<{
  image: string;
  name: string;
  show?: boolean;
  id?: string | number;
}> = (props) => {
  const router = useRouter();

  return (
    <div className="p-5 w-full h-[25rem] font-poppins cursor-pointer text-text-dark rounded-2xl opacity-80 hover:opacity-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 bg-red-100 w-full h-full z-0 ">
        <Image
          src={"https://image.tmdb.org/t/p/w500/" + props.image}
          layout="fill"
          objectFit="cover"
          onClick={() => {
            if (!props.show) {
              router.push(`/show?id=${props.id}`);
            }
          }}
        />
      </div>
      <div className="absolute right-5 top-5 p-5 hover:bg-secondary-dark text-4xl rounded-full">
        {!props.show && (
          <span>
            <BsBookmark />
          </span>
        )}
      </div>
      {!props.show && (
        <div className="p-5 mt-auto absolute left-0 bottom-0 ">
          <h2 className="text-xl font-bold flex items-center gap-5 ">
            <div className="year">2019</div>
            <div className="type flex items-center gap-2">
              <MdMovie /> Movie
            </div>
            <div className="cat">PG</div>
          </h2>

          <h1 className="text-4xl font-bold">{props.name}</h1>
        </div>
      )}
    </div>
  );
};

export default CardSlider;
