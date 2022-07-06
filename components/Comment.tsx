import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react'

function Comment({comment}) {
  const router = useRouter();

  return (
    <div className="comment-list flex flex-wrap gap-6  my-10 p-10 rounded-xl bg-secondary-dark">
                <div className="comment-avatar bg-red-50 w-20 h-20 rounded-full overflow-hidden">
            <img
              src={`https://avatars.dicebear.com/api/big-ears-neutral/${comment.user.id}.svg`}
              alt=""
              className="avatar"
            />
          </div>
          <div className="comment-content flex justify-between  flex-1 flex-col">
            <div className="comment-name text-xl cursor-pointer font-bold text-text-dark" onClick={() => router.push("/user/" + comment.user.id)}>
           <span>
           {comment.user.name.toUpperCase()}
           </span>
            
            
            <span 
             className={`inline-flex items-center mx-10 px-2 py-1 bg-primary-dark  rounded-full text-sm font-semibold text-dark`}>
    <span className="ml-1">
    {moment(Number(comment.createdAt)).format("MM-DD-YYYY")}
    </span>
    </span>
            </div>
            <div className="comment-text text-2xl text-text-dark">
              {comment.content}
            </div>
          </div>
          </div>
  )
}

export default Comment