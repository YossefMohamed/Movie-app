import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";
import Alert from "../components/Alert";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import Link from "next/link";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      email === "" ||
      password === ""
    ) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    console.log({
      email: email,
      password: password,
    });
    client
      .query({
        query: gql`
        query login(
            $email: String!
            $password: String!
          ) {
            login(
              email: $email
              password: $password
            ) {
              token,
              user {
                favoriteMovies {
                  movieID
                  movieName
                }
                savedMovies{
                  movieID
                  movieName
                }
                id
                name
                email
                image
                updatedAt
                verified
                createdAt
              }}
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        if (data.login.token) {
          dispatch(login(data.login.user));
          localStorage.setItem("token", data.login.token);
          router.push("/");
        } else {
          setError("Something went wrong!");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };
  
  
  
  
  
  
  return (
    <div className="py-20">
      {
        error && (<Alert type="info" message={error} />) 
      }
      {
        loading && (<Alert type="info" message={"Loading ..."} />)
      }
      <div className="info py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="email@example.com"
          />
        </div>{" "}
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Password</div>
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Your Password"
          />
        </div>
        <div className="w-fit">
       <Link href="/register">
          <a>
            Have An Account?
          </a>

        </Link>
       </div>
        <button onClick={handleSubmit} className="btn w-fit bg-secondary-dark px-16 py-5 font-bold text-3xl hover:bg-button-primary hover:text-text-dark outline-none " disabled={loading||!email ||!password}>
          Submit
        </button>
     
      </div>
    </div>
  );
}
