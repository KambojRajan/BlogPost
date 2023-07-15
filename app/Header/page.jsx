"use client"
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../UserContext";

const axiosObj = axios.create();

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function logout() {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const userName = userInfo?.userName;

  return (
    <header className="flex justify-between items-center mb-8 p-3 max-w-[800px] mx-auto">
      <Link href="/" passHref className="logo text-black font-bold">
        MyBlog
      </Link>
      <nav className="flex gap-4">
        {userName ? (
          <>
            <Link href="/CreatePost" passHref>
              Create New Pos
            </Link>
            <h1 onClick={logout}>Logout</h1>
          </>
        ) : (
          <>
            <Link href="/Login" passHref>
              Login
            </Link>
            <Link href="/Register" passHref>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
