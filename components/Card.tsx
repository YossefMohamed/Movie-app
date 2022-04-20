import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsBookmark } from "react-icons/bs";
import { MdMovie } from "react-icons/md";

const Card :NextPage<{image : string; name : string ; lang:string ; date : string ; id:number }>  =(props) => {
  return (
    <div className="py-5 flex flex-col font-poppins text-text-dark rounded-2xl opacity-95 hover:opacity-100 relative">
      <div className=" w-full z-0 h-[85%] rounded-xl overflow-hidden">
        <Image
          src={"https://image.tmdb.org/t/p/w500/" + props.image}
          layout="responsive"
          width={350}
          height={300}
          objectFit="cover"
        />
      </div>
      <div className="absolute right-10 top-10 p-5 hover:bg-secondary-dark text-4xl rounded-full">
        <span>
          <BsBookmark />
        </span>
      </div>
      <div className="p-5 mt-auto  flex-1">
        <h2 className="text-xl font-bold flex items-center gap-5 opacity-75">
          <div className="year">
            {new Date(props.date).getFullYear()}
          </div>
          <div className="type flex items-center gap-2">
            <MdMovie /> Movie
          </div>
          <div className="cat">
            {props.lang}
          </div>
        </h2 >
        <Link href={`/show?id=${props.id}`}>
    
        <h1 className="text-4xl font-bold cursor-pointer">{props.name}</h1>
      </Link>

      </div>
    </div>
  );
}

export default Card;
