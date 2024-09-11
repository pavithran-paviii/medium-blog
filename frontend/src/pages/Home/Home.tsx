import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import EachPost, { EachPostLoading } from "../../components/EachPost";
import axios from "axios";
import { BlogStructure } from "./home.types";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);

  //functions
  async function getAllBlogs() {
    setLocalLoading(true);
    try {
      let response = await axios.get(
        `https://backend.pavithranr65.workers.dev/api/v1/blog/bulk`
      );
      if (response?.data?.data?.length > 0 && response.data?.status) {
        setAllBlogs(response?.data?.data);
      }
      setLocalLoading(false);
    } catch (error) {
      setLocalLoading(false);
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
      <div className="flex flex-col gap-4 max-w-screen-xl m-auto pb-16 ">
        {localLoading
          ? Array.from({ length: 6 }).map((eachItem, index) => {
              return <EachPostLoading />;
            })
          : allBlogs?.length > 0 &&
            allBlogs?.map((eachBlog: BlogStructure) => {
              return <EachPost key={eachBlog?.id} {...eachBlog} />;
            })}
      </div>
    </div>
  );
};

export default Home;
