import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import Slider from "../components/Slider";
import CardSlider from "../components/CardSlider";
import { useRouter } from "next/router";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import { addToast } from "../redux/toasted";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../redux/user";

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  if (!id)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=credits`
  );
  const resImages = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.API_KEY}`
  );
  const resVideo = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}`
  );
  const resRecommendations = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  const data: any = await res.json();
  const images: any = await resImages.json();
  const recommendations: any = await resRecommendations.json();
  const videos: any = await resVideo.json();
  resVideo;
  return {
    props: {
      data: data,
      images,
      videos: videos.results,
      recommendations: recommendations.results,
    },
  };
};

export default function Show(props) {
  const router = useRouter();
  const [rating] = React.useState<number>(Number(props.data.vote_average) / 2);
  const {favoriteMovies} = useSelector((state :any) => state.user.user)
  let counter = 0;
  const dispatch = useDispatch();
  
  const handleAddFavorite = async (e) => {
    e.preventDefault();
    client
      .mutate({
        mutation: gql`
          mutation addMovie($movieName: String!, $movieID: Int! , $movieImage : String!) {
            addMovie(movieName: $movieName, movieID: $movieID , movieImage : $movieImage) {
    id
    name
    email
    image
    updatedAt
    verified
    createdAt
    favoriteMovies {
      movieName
      movieID
      movieImage
    }
  }
          }
        `,
        variables: {
          movieName: props.data.title,
          movieID: props.data.id,
          movieImage : props.data.poster_path
          },
        context : {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
      })
      .then(({ data }) => {
        dispatch(login(data.addMovie))
        dispatch(addToast({
          type: "success",
          message: "Movie added to favorites",
        }))

      })
      .catch((error) => {
        dispatch(addToast({
          type: "error",
          message: error.message,
        }))
      });
  };
  const handleRemoveFavorite = async(e) => {
    e.preventDefault();
   
    client
      .mutate({
        mutation: gql`
          mutation removeMovie($movieID: Int!) {
            removeMovie(movieID: $movieID) {
    id
    name
    email
    image
    updatedAt
    verified
    createdAt
    favoriteMovies {
      movieName
      movieID
      movieImage
    }
  }
          }
        `,
        variables: {
          movieID: props.data.id,
          },
        context : {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
      })
      .then(({ data }) => {
        dispatch(login(data.removeMovie))
        dispatch(addToast({
          type: "success",
          message: "Movie Removed From Favorites",
        }))

      })
      .catch((error) => {
        dispatch(addToast({
          type: "error",
          message: error.message,
        }))
      });
  }
  
  
  
  return (
    <div>
      <div className="relative h-[550px] my-8">
        <div className="w-full z-[10] absolute top-0 left-0  rounded-2xl overflow-hidden h-full ">
          <div className="  h-full w-full z-[-1]  overflow-hidden absolute inset-0 bg-primary-dark brightness-50">
            <Image
              src={
                props.data.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${props.data.backdrop_path}`
                  : " https://i.ytimg.com/vi/np4n2DIOKVM/maxresdefault.jpg"
              }
              layout="fill"
              className="object-cover "
            />
          </div>
          <div className="z-[99]  w-full flex h-full flex-col justify-center p-10 gap-6">
            <div className="text-7xl lg:text-8xl font-bold">{props.data.title}</div>
            <div className="text-7xl font-bold ">
              {props.data.release_date.split("-")[0]}
            </div>
            <div className="rating flex gap-4">
              {Array(Math.floor(rating))
                .fill(0)
                .map((_, i) => (
                  <AiFillStar key={i} className="text-yellow-500" size={30} />
                ))}
              {Array(5 - Math.floor(rating))
                .fill(0)
                .map((_, i) => (
                  <AiFillStar key={i} size={30} />
                ))}
            </div>
            <div className="overview w-[50%] text-lg lg:text-2xl">
              {props.data.overview.length > 200
                ? props.data.overview.slice(0, 200) + "..."
                : props.data.overview}
            </div>
            <div className="flex gap-6">
              <button className="bg-secondary-dark text-white font-bold py-5 px-12 rounded-full hover:button-secondary hover:opacity-75 ">
                Watch
              </button>

                {
                  !favoriteMovies.find(movie =>{ 
                    return movie.movieID == props.data.id
                  
                  }) ?(
                    <button onClick={handleAddFavorite} className="bg-green-600 text-white font-bold py-5 px-12 rounded-full  hover:button-secondary hover:opacity-75">
                Add To Favorite
              </button >
                  ):(
                    <button onClick={handleRemoveFavorite} className="bg-red-600 text-white font-bold py-5 px-12 rounded-full  hover:button-secondary hover:opacity-75">
                Remove From Favorite
              </button >
                  )
                }
             
            </div>
          </div>
        </div>
      </div>
      <div className="section my-[50px]">
        <div className="text-6xl mb-[50px] font-bold uppercase">Images</div>
        <div className="flex justify-between flex-wrap gap-y-16 my-16">
          <Slider>
            {props.images.backdrops.map((image) => (
              <div
                className="keen-slider__slide  number-slide1 "
                key={image.id}
              >
                <CardSlider image={image.file_path} name="" show={true} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex section  my-[50px] flex-wrap">
        <div className="cast-container  sm:w-full lg:w-1/2 flex flex-col justify-start">
          <div className="text-6xl mb-[50px] font-bold uppercase ">Cast</div>
          <div className="cast-list flex flex-wrap justify-start gap-16 ">
            {props.data.credits.cast.map((cast, index) => {
              if (cast.profile_path && counter < 6) {
                counter++;
                return (
                  <div className="cast-container" key={index}>
                    <div
                      className="cast-item hover:opacity-75"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${cast.profile_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "150px",
                        width: "150px",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onClick={() => {
                        router.push(`/actor/${cast.id}`);
                      }}
                    ></div>

                    <div className="cast-name text-xl font-bold mt-3 text-text-dark">
                      {cast.name}
                    </div>
                    <div className="cast-character text-sm  text-text-dark">
                      {cast.character.split("/")[0]}

                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="description sm:w-full lg:w-1/2 mt-16 lg:mt-0 flex flex-col gap-16">
          <div>
            <div className="text-6xl mb-[50px] font-bold uppercase">
              Description
            </div>
            <div className="text-2xl leading-[200%]">{props.data.overview}</div>
          </div>
          <div>
            <div className="text-6xl my-16">Tags</div>
            <div className="tags flex flex-wrap justify-start gap-6">
              {props.data.genres.map((genre, index) => {
                return (
                  <div
                    className="tag text-2xl bg-secondary-dark py-3 px-12 rounded-full hover:opacity-60 cursor-pointer"
                    key={index}
                  >
                    {genre.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="section watch-section">
        <div className="text-6xl mb-[50px] font-bold uppercase">Watch</div>
        {props.videos[0] ? (
          <div className="h-[650px]">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${props.videos[0].key}`}
            ></iframe>
          </div>
        ) : (
          <div className="w-full text-6xl font-bold ">Sorry no video</div>
        )}
      </div>
      <div className="recommendations-section  my-[50px]">
        <div className="text-6xl mb-[20px] font-bold uppercase">
          You May Also Like
        </div>

        <div className="flex justify-between flex-wrap gap-y-16 ">
          <Slider>
            {props.recommendations.map((show, idx) => (
              <div className="keen-slider__slide  number-slide1 " key={idx}>
                <CardSlider
                  name={show.title}
                  image={show.backdrop_path}
                  id={show.id}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="comment-section my-[50px]">
        <div className="new my-[50px]">
          <div className="rounded-lg">
            <form action="" className="w-full p-4 py-10">
              <div className="mb-2">
                <label htmlFor="comment" className="text-4xl text-text-dark">
                  Add a comment
                </label>
                <textarea
                  className="w-full h-[100px] p-4   outline-none  my-5 bg-primary-dark text-text-dark rounded-xl "
                  name="comment"
                  placeholder="Add your comment"
                ></textarea>
              </div>
              <div>
                <button className="px-10 py-5  text-blue-100 bg-primary-dark rounded">
                  Comment
                </button>
                <button className="px-10 py-5 mx-6  rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-4xl mb-[50px] font-bold uppercase">Comments</div>
        <div className="comment-list flex flex-wrap gap-6  p-5 rounded-xl">
          <div className="comment-avatar bg-red-50 w-20 h-20 rounded-full overflow-hidden">
            <img
              src={`https://avatars.githubusercontent.com/u/13303306?s=120&v=4`}
              alt=""
              className="avatar"
            />
          </div>
          <div className="comment-content flex justify-between  flex-1 flex-col">
            <div className="comment-name text-xl font-bold text-text-dark">
              Yossef Mohamed - 5 min ago
            </div>
            <div className="comment-text text-2xl text-text-dark">
              Great Film !! I
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
