import React from "react";
import Image from "next/image";
const UserCard = ({ user }) => {
  return (
    <div className="flex flex-col p-5  rounded-xl bg-secondary-dark items-center">
      <div className="w-52 h-52 flex justify-center">
        <Image
          src={`https://avatars.dicebear.com/api/big-ears-neutral/${user.id}.svg`}
          objectFit="fill"
          width="100%"
          height="100%"
          className="rounded"
        />
      </div>
      <div className="text-4xl font-bold my-3">
        <a href="#">{user.name}</a>
      </div>
      <div className="details">
        <div className="text-slate-500  text-xl">
          {user.favoriteMovies.length} Favourite Movies
        </div>
      </div>
      <div className="buttons mt-3">
        <button className="btn btn-danger mr-5 py-3 px-5">UnFollow</button>
        <button className="btn bg-primary-dark py-3 px-5">Block</button>
      </div>
    </div>
  );
};

export default UserCard;
