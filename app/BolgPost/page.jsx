"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatISO, formatISO9075 } from "date-fns";

function BlogPost({ postId, title, author, date, image, summary, content }) {
  const formattedDate = formatISO9075(new Date(date));
  const imageUrl = `http://localhost:5000/${image.replace(/\\/g, "/")}`;

  return (
    <div className="post relative mb-5 p-3 max-w-[800px] mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 ">
          <Link href={`/Posts/${postId}`}>
            <Image
              src={"/"}
              priority={true}
              alt="food"
              className="rounded-md shadow-md shadow-black"
              layout="responsive"
              width={600}
              height={500}
            />
          </Link>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center px-4 py-2">
          <Link href={`/Posts/${postId}`}>
            <h1 className="text-2xl mb-2 font-medium text-pink-700">{title}</h1>
          </Link>
          <p className="mt-0">
            <Link href="/" className="author text-black font-bold">
              {author.userName}{" "}
            </Link>
            <time className="text-gray-500 ml-2">{formattedDate}</time>{" "}
          </p>
          <p className="text-gray-500 mt-3 mx-0">{summary}</p>
          <div
            className="content mt-3 mx-0"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
