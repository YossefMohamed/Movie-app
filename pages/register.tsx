import Image from "next/image";
import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";
import Alert from "../components/Alert";
import { login } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    client
      .mutate({
        mutation: gql`
          mutation Register(
            $name: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
          ) {
            register(
              name: $name
              email: $email
              password: $password
              confirmPassword: $confirmPassword
            ) {
              token
              user {
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
                savedMovies {
                  movieName
                  movieID
                  movieImage
                }
                deleted
                following
              }
            }
          }
        `,
        variables: {
          name: name,
          email: email,
          password: password,
          confirmPassword: passwordConfirm,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        if (data.register.token) {
          dispatch(login(data.register.user));
          localStorage.setItem("token", data.register.token);
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
  React.useEffect(() => {
    user.id ? router.push("/") : null;
  }, [user]);
  return (
    <>
      {loading ? (
        <div className="py-20">
          <Alert type="info" message={"Loading ..."} />
        </div>
      ) : (
        <div className="py-20">
          {error && <Alert type="danger" message={error} />}
          <div className="info py-20 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="name text-3xl font-bold">Name</div>
              <input
                type="text"
                className="w-full border-0 outline-0 bg-secondary-dark p-6 text-text-dark
          focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>{" "}
            <div className="flex flex-col gap-4">
              <div className="name text-3xl font-bold">Email</div>
              <input
                type="email"
                className="w-full border-0 outline-0 bg-secondary-dark p-6 text-text-dark
          focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>{" "}
            <div className="flex flex-col gap-4">
              <div className="name text-3xl font-bold">Password</div>
              <input
                type="password"
                className="w-full border-0 outline-0 bg-secondary-dark p-6 text-text-dark
          focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>{" "}
            <div className="flex flex-col gap-4">
              <div className="name text-3xl font-bold">Confirm Password</div>
              <input
                type="password"
                className="w-full border-0 outline-0 bg-secondary-dark p-6 text-text-dark
          focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
                placeholder="Confirm Your Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button
              className="btn w-fit bg-secondary-dark px-16 py-6 font-bold text-3xl hover:bg-button-primary hover:text-text-dark"
              onClick={handleSubmit}
            >
              {!loading ? "Submit" : "Loading"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
