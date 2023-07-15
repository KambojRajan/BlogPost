"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UserContext } from "@/app/UserContext";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import Header from "@/app/Header/page";

function SinglePost() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const image = postInfo?.cover;
  const imageUrl = `http://localhost:5000/${image?.replace(/\\/g, "/")}`;

  useEffect(() => {
    fetch(`http://localhost:5000/Posts/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
    console.log(id);
  }, []);

  if (!postInfo) return null;

  const { author, createdAt } = postInfo;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-200">
        <div className="container mx-auto p-4">
          <article className="bg-white rounded-lg shadow-lg">
            <header className="px-6 py-4 flex items-center justify-between">
              <h1 className="text-4xl font-bold">{postInfo.title}</h1>
              <Link href={`/Edit/${id}`}>
                <button className="px-4 py-2 flex gap-x-1 items-center bg-blue-500 text-white rounded">
                  <FiEdit3 />
                  Edit Post
                </button>
              </Link>
            </header>

            <div className="px-6 py-2">
              <h2 className="text-lg text-gray-600">
                Published on {new Date(createdAt).toLocaleDateString()}
              </h2>
              <div className="flex items-center mt-2">
                <div className="rounded-full h-8 w-8 bg-gray-300"></div>
                <p className="text-gray-600 ml-2">{author.userName}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="p-4 md:w-1/2">
                <Image
                  className="rounded-md"
                  src={"/Images/fruitsInWineGlass.jpg"}
                  alt="Article Image"
                  width={500}
                  height={500}
                />
              </div>

              <div className="p-6 md:w-1/2">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: postInfo.content }}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
