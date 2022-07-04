import { NextPage } from "next";
import Link from "next/link";
import React from "react";

export const Pagination : NextPage<{ onClick: any; next: any ; prev:any ;currentPage :any}>  = (props) => {
  
  const next = props.next()
  const prev = props.prev()
  console.log(props.onClick)
  return (
    <div className="m-auto">
      <nav
        className="relative z-0  rounded-md shadow-sm   w-full flex justify-center"
        aria-label="Pagination"
      >
       {props.prev() && 
      (        

<div
                  onClick={() => props.onClick(prev)}

          className="relative flex items-center cursor-pointer px-2 py-2 rounded-l-md border border-secondary-dark bg-primary-dark text-sm font-medium text-gray-500 hover:opacity-75"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      )}
        {props.prev() && 
         (
        <div
                  onClick={() => props.onClick(prev)}
          aria-current="page"
          className="bg-primary-dark cursor-pointer border-secondary-dark text-gray-500 hover:opacity-75 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
                    {props.prev()}

        
        </div>)}
        <div
          className="bg-secondary-dark cursor-pointer border-secondary-dark text-gray-500 hover:opacity-75 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
                   {props.currentPage}

        </div>
        

     {props.next() &&   
     
     (
     <div
          onClick={() => props.onClick(next)}
          className="bg-primary-dark  cursor-pointer border-secondary-dark text-gray-500 hover:opacity-75 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
          {props.next()}
        </div>
        
        )}

       {props.next() && (
       <div
          onClick={() => props.onClick(next)}
          className="relative inline-flex cursor-pointer items-center px-2 py-2 rounded-r-md border border-secondary-dark bg-primary-dark text-sm font-medium text-gray-500 hover:opacity-75"
        >
          <span className="sr-only">{props.next()}</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        
        </div>)}
      </nav>
    </div>
  );
};
