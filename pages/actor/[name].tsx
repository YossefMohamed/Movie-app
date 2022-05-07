import React from "react";
import Card from "../../components/Card";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  const { name: id } = context.query;
  const res = await fetch(
    `http://api.tmdb.org/3/person/${id}?api_key=${process.env.API_KEY}&append_to_response=combined_credits`
  );

  const data: any = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
export default function Actor(props) {
  return (
    <div>
      <div className="trending py-20 text-5xl">
        <div className="profile-page">
          <div className="profile-pic"></div>
          <div className="title">
            <div className=" flex justify-center rounded-3xl overflow-hidden w-fit m-auto">
              <Image
                src={
                  "https://image.tmdb.org/t/p/w500/" + props.data.profile_path
                }
                width={250}
                height={300}
                objectFit="cover"
              />
            </div>
            <div className="name text-center my-16">{props.data.name}</div>
          </div>
          <div className="description mb-16 flex">
            <div className="text-center text-xl flex flex-wrap gap-5 m-auto ">
              {props.data.also_known_as[0] && (
                <div className="bg-secondary-dark w-fit hover:opacity-75 px-7 py-3 rounded-2xl">
                  {props.data.also_known_as[0]}
                </div>
              )}
              {props.data.birthday && (
                <div className="bg-secondary-dark w-fit hover:opacity-75 px-7 py-3 rounded-2xl">
                  {props.data.birthday}
                </div>
              )}
              {props.data.known_for_department && (
                <div className="bg-secondary-dark w-fit hover:opacity-75 px-7 py-3 rounded-2xl">
                  {props.data.known_for_department}
                </div>
              )}
              {props.data.gender && (
                <div className="bg-secondary-dark w-fit hover:opacity-75 px-7 py-3 rounded-2xl">
                  {props.data.gender === 1 ? "Female" : "Male"}
                </div>
              )}
            </div>
          </div>
          <div className="text-6xl font-bold">Top Movies</div>
          <div className="flex flex-wrap gap-[2%]">
            {props.data.combined_credits.cast &&
              props.data.combined_credits.cast.map((item, idx) => {
                if (idx < 20) {
                  return (
                    <div
                      className="sm:w-[90%] md:w-[31%] w-[40%] my-10"
                      key={item.id}
                    >
                      <Card
                        image={item.poster_path}
                        name={item.original_title}
                        date={item.release_date}
                        lang={item.original_language}
                        id={item.id}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
