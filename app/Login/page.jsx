"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import Header from "../Header/page";
import { useRouter } from "next/navigation";


function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  async function LoginLogic(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/Login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }else{
      alert("wrong password")
    }
  }
  if (redirect) {
    router.push("/");
  }
  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-[400px] mx-auto p-4">
        <h1 className="text-4xl mb-5 mt-3 text-black font-semibold text-center">
          Login
        </h1>
        <form className="flex flex-col gap-3" onSubmit={LoginLogic}>
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {warning && (
            <span className="text-red-500">
              Please check the password as it seems incorrect
            </span>
          )}
          <button className="py-3 px-4 bg-black text-white rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
