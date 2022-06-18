import Image from "next/image";
import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";

export default function Register(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    console.log({
      name: name,
      email: email,
      password: password,
      confirmPassword: passwordConfirm,
    });
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

  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="loading-spinner text-text-dark text-white py-6">
            Loading ....
          </div>
        </div>
      ) : (
        <div className="py-20">
          {error && (
            <div
              className="w-full bg-red-800 p-4 rounded text-3xl"
              role="alert"
            >
              {error}
            </div>
          )}
          <div className="info py-20 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="name text-3xl font-bold">Name</div>
              <input
                type="text"
                className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
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
                className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
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
                className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
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
                className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
          focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
                placeholder="Confirm Your Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button
              className="btn w-fit bg-secondary-dark px-16 py-5 font-bold text-3xl hover:bg-button-primary hover:text-text-dark"
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