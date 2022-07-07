import { gql } from "@apollo/client";
import Image from "next/image";
import React, { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Alert from "../components/Alert";
import { login } from "../redux/user";
import client from "./../apollo-client";
import { addToast } from "./../redux/toasted";

export default function ME(props) {
  const user = useSelector((state : any) => state.user.user)
  const [name , setName] = useState(user.name)
  const [email , setEmail] = useState(user.email)
  const [loading , setLoading] = useState(false)
  const [password , setPassword] = useState("")
  const [passwordConfirm , setPasswordConfirm] = useState("")
  const [oldPassword , setOldPassword] = useState("")
  const [error , setError] = useState("")
  const dispatch = useDispatch()
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      name === "" ||
      email === ""
    ) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError("New Passwords do not match");
      setLoading(false);
      return;
    }
    client
      .mutate({
        mutation: gql`
       mutation UpdateUser($name: String!, $email: String!, $oldPassword: String!, $password: String!) {
  updateUser(name: $name, email: $email, oldPassword: $oldPassword, password: $password) {
    token
    user {
      id
      name
      email
      image
      updatedAt
      verified
      createdAt
      following
      savedMovies {
        movieName
        movieID
        movieImage
      }
      favoriteMovies {
        movieName
        movieID
        movieImage
      }
    }
  }
}
        `,
        variables: {
          name: name,
          email: email,
          password: password,
          oldPassword: oldPassword,
        },
        context : {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        }}
      })
      .then(({ data }) => {
        setLoading(false);
        if (data.updateUser.token) {
          dispatch(login(data.updateUser.user));
          localStorage.setItem("token", data.updateUser.token);
          dispatch(addToast({
      type : "success",
      message : "Your Data Have Been Updated!!"
    }))
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
    {loading ?  <Alert type="info" message="Loading..." />  :   <>
    {error && <Alert type="danger" message={error} /> }
      <div className="flex justify-start gap-20 items-stretch ">
        <div>
          <Image
            src={`https://avatars.dicebear.com/api/big-ears-neutral/${user.id}.svg`}
            alt="Picture of the author"
            width={100}
            className="rounded-xl"
            height={100}
          />
        </div>
        <div className="items-stretch flex flex-col justify-center gap-4">
          <div className="text-6xl font-bold ">{user.name.toUpperCase()}</div>
          <div className="info flex items-center  gap-3 text-2xl ">
            <BsBookmark /> <div className="number">{user.savedMovies.length}</div> Saved Movies
          </div>
        </div>
      </div>
      <div className="info py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Name</div>
          <input
            type="text"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>{" "}
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Last Name</div>
          <input
            type="email"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Your Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}          />
        </div>{" "}
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Old Password</div>
          <input
            type="password"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Your Password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">New Password</div>
          <input
            type="password"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Your Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="name text-3xl font-bold">Confirm New Password</div>
          <input
            type="password"
            className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
            placeholder="Confirm Your Password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
        
          />
        </div>
        <div className="btn w-fit bg-secondary-dark px-16 py-5 font-bold text-3xl hover:bg-button-primary hover:text-text-dark"
        onClick={handleSubmit}>
          Submit
        </div>
      </div>

      </>}
    </div>
  );
}
