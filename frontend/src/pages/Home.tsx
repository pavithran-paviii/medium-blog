import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EachPost from "../components/EachPost";
import axios from "axios";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  //functions
  async function getAllBlogs() {
    try {
      let response = await axios.get(
        `https://backend.pavithranr65.workers.dev/api/v1/blog/bulk`
      );
      console.log(response, "response feom all the blohs");
    } catch (error) {
      console.log(error, "Get all blogs error");
    }
  }

  //renderings

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-4 max-w-screen-xl m-auto border-b pb-16">
        <EachPost />
      </div>
    </div>
  );
};

export default Home;
