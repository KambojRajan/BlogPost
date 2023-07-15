"use client";
import React, { useState } from "react";
import Header from "../Header/page";
const Axios = require("axios");
const axiosInstance = Axios.create();

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = (event) => {
    event.preventDefault();

    axiosInstance
      .post("http://localhost:5000/register", {
        userName,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-[400px] mx-auto p-4">
        <h1 className="text-4xl mb-5 mt-3 text-black font-semibold text-center">
          Register
        </h1>
        <form className="flex flex-col gap-3" onSubmit={register}>
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="py-3 px-4 bg-black text-white rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
