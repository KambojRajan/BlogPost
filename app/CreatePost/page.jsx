"use client"
import React, { useState } from "react";
import Header from "../Header/page";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
];

function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (eve) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0] || "");
    eve.preventDefault();
    const response = await fetch("http://localhost:5000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-screen-md mx-auto bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Create a New Post</h2>
          <form onSubmit={createNewPost}>
            <input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Summary"
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
              value={summary}
              onChange={(ev) => setSummary(ev.target.value)}
            />
            <input
              type="file"
              onChange={(ev) => setFiles(ev.target.files)}
              className="mb-4"
            />
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              onChange={(newValue) => setContent(newValue)}
              className="mb-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
