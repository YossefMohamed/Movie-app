import React from 'react'
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <div className="w-full relative rounded-xl overflow-hidden flex justify-start">
        <button className='p-5 bg-secondary-dark '>
        <span className='text-text-dark text-4xl'>
        <FaSearch />
        </span>
        </button>
        <input type="text" className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold" placeholder="Search for movies or TV series"  />
        
    </div>
  )
}

export default SearchInput