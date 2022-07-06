import React from 'react'

function PostComment() {
  return (
<div className="media flex pb-4">
      <a className="inline-block mr-4 mt-1" href="#">
        <img
          className="rounded-full max-w-none w-12 h-12"
          src="https://randomuser.me/api/portraits/women/76.jpg"
        />
      </a>
      <div className="media-body">
      <div>
          <a className="inline-block text-xl font-bold mr-2" href="#">
            Leslie Alexander
          </a>
          <span className="text-slate-500 text-lg">
            25 minutes ago
          </span>
        </div>
        <p>Dolor sit ameteiusmod consectetur adipiscing elit.</p>
        <div className="mt-2 flex items-center">
          <a className="inline-flex items-center py-2 mr-3" href="#">
            <span className="mr-2">
              <svg
                className="fill-rose-600 dark:fill-rose-400"
                style={{ width: 22, height: 22 }}
                viewBox="0 0 24 24"
              >
                <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"></path>
              </svg>
            </span>
            <span className="text-base font-bold">0</span>
          </a>
          
        </div>
      </div>
    </div>  )
}

export default PostComment