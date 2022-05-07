import React from "react";

export const Pagination = () => {
  return (
    <div className="m-auto">
      <nav
        className="relative z-0  rounded-md shadow-sm   w-full flex justify-center"
        aria-label="Pagination"
      >
        <a
          href="#"
          className="relative flex items-center px-2 py-2 rounded-l-md border border-secondary-dark bg-primary-dark text-sm font-medium text-gray-500 hover:opacity-75"
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
        </a>
        <a
          href="#"
          aria-current="page"
          className="z-10 border-secondary-dark border-white-500 text-white-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
          {" "}
          1{" "}
        </a>
        <a
          href="#"
          className="bg-primary-dark border-secondary-dark text-gray-500 hover:opacity-75 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
          {" "}
          2{" "}
        </a>
        <a
          href="#"
          className="bg-primary-dark border-secondary-dark text-gray-500 hover:opacity-75 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
        >
          {" "}
          3{" "}
        </a>

        <a
          href="#"
          className="bg-primary-dark border-secondary-dark text-gray-500 hover:opacity-75 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
          {" "}
          3{" "}
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-secondary-dark bg-primary-dark text-sm font-medium text-gray-500 hover:opacity-75"
        >
          <span className="sr-only">Next</span>
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
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </nav>
    </div>
  );
};
