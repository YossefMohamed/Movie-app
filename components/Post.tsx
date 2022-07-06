import React from 'react'
import PostComment from './PostComment'
import Tag from './Tag'

function Post() {
  return (
      
    <article className="mb-4 break-inside p-6 rounded-xl bg-secondary-dark dark:bg-slate-800 flex flex-col bg-clip-border">
    <div className="flex pb-6 items-center justify-between">
      <div className="flex">
        <a className="inline-block mr-4" href="#">
          <img
            className="rounded-full max-w-none w-14 h-14"
            src="https://randomuser.me/api/portraits/men/35.jpg"
          />
        </a>
        <div className="flex flex-col justify-center">
          <div>
            <a
              className="inline-block text-xl font-bold dark:text-white"
              href="#"
            >
              Wade Warren
            </a>
          </div>
          <div className="text-slate-500  text-lg dark:text-slate-400">
            July 17, 2018
          </div>
        </div>
      </div>
    </div>
    <p className="text-2xl font-extrabold dark:text-white">
      Web Design templates Selection
    </p>
    <div className="py-4 image-section">

      <div className="flex justify-between gap-1 mb-1">
        <a className="flex" href="#">
          <img
            className="max-w-full rounded-tl-lg"
            src="https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          />
        </a>
        <a className="flex" href="#">
          <img
            className="max-w-full"
            src="https://images.pexels.com/photos/247929/pexels-photo-247929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          />
        </a>
        <a className="flex" href="#">
          <img
            className="max-w-full rounded-tr-lg"
            src="https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          />
        </a>
      </div>


      <div className="flex justify-between gap-1">
        <a className="flex" href="#">
          <img
            className="max-w-full rounded-bl-lg"
            src="https://images.pexels.com/photos/1429748/pexels-photo-1429748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          />
        </a>
        <a className="flex" href="#">
          <img
            className="max-w-full rounded-br-lg"
            src="https://images.pexels.com/photos/69020/pexels-photo-69020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          />
        </a>
      </div>
    </div>
    <p className="text-2xl font-extrabold dark:text-white">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>

        <div className="flex my-4">
            
    <Tag />
    <Tag />
    <Tag />
        </div>




    <div className="py-3">

      <a className="inline-flex items-center" href="#">
        <span className="mr-2">
          <svg
            className="fill-rose-600 dark:fill-rose-400"
            style={{ width: 24, height: 24 }}
            viewBox="0 0 24 24"
          >
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
          </svg>
        </span>
        <span className="text-lg font-bold">34</span>
      </a>
    </div>
    <div className="relative">
      <input
        className="pt-7 pb-7 pl-3 w-full h-11 bg-gray-800 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
        type="text"
        placeholder="Write a comment"
      />
      <span className="flex absolute right-3 top-2/4 translate-y-[-50%] items-center">
        <svg
          className="mr-2"
          style={{ width: 20, height: 20 }}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
          ></path>
        </svg>
        <svg
          className="fill-blue-500 dark:fill-slate-50"
          style={{ width: 20, height: 20 }}
          viewBox="0 0 24 24"
        >
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
      </span>
    </div>
    {/* Comments content */}
    <div className="pt-6">
  
  <PostComment />
  
    </div>
  </article>  )
}

export default Post