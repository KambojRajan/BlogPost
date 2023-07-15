import React, { useEffect } from "react";
import Header from "../Header/page";
import axios from "axios";

const Profile = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", {
        withCredentials: true,
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log("Error:", err);
        console.log("Error response:", err.response);
      });
  }, []);

  return (
    <div>
      <Header />
      <h1>Profile Page</h1>
      {/* Display user information */}
    </div>
  );
};

export default Profile;
