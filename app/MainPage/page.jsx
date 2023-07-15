"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header/page";
import BlogPost from "../BolgPost/page";

function MainPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/post").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {posts.length > 0 &&
          posts.map((post) => (
            <BlogPost
              key={post._id}
              postId={post._id}
              title={post.title}
              summary={post.summary}
              content={post.content}
              image={post.cover}
              author={post.author}
              date={post.createdAt}
            />
          ))}
      </main>
    </div>
  );
}

export default MainPage;
