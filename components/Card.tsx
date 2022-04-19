import Image from 'next/image'
import React from 'react'
import { BsBookmark } from 'react-icons/bs'
import { MdMovie } from 'react-icons/md'

function Card() {
  return (
        <div className="p-5 w-[30%] h-[25rem] font-poppins cursor-pointer text-text-dark rounded-2xl opacity-80 hover:opacity-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 bg-red-100 w-full h-full z-0 ">

        <Image src="https://images.unsplash.com/photo-1650299838813-b28de4d66c2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80" layout='fill'
    objectFit='cover'/>

            </div>
            <div className="absolute right-5 top-5 p-5 hover:bg-secondary-dark text-4xl rounded-full">
                <span>
                <BsBookmark />
                </span>
            </div>
            <div className="p-5 mt-auto absolute left-0 bottom-0 ">
            <h2 className="text-4xl font-bold flex items-center gap-5 ">
                <div className="year">
                2019</div>  
                <div className="type flex items-center gap-2">
                <MdMovie /> Movie
                </div>
                  <div className="cat">
                  PG
                  </div>
                  </h2>

                <h1 className="text-6xl font-bold">The Lion King</h1>
                </div>
            </div>
  )
}

export default Card