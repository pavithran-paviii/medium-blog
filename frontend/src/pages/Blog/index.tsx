import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { BlogStructure } from "../Home/home.types";
import moment from "moment";

const Blog = () => {
  const { blogid } = useParams();
  const [eachBlog, setEachBlog] = useState<Partial<BlogStructure>>({});
  const [localLoading, setLocalLoading] = useState(false);

  //functions
  async function getSingleBlog() {
    setLocalLoading(true);
    try {
      let response = await axios.get(
        `https://backend.pavithranr65.workers.dev/api/v1/blog/${blogid}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("medium-clone")}`,
          },
        }
      );
      if (response?.data?.status > 0) {
        setEachBlog(response?.data?.data);
      }
      setLocalLoading(false);
    } catch (error) {
      setLocalLoading(false);
      console.log(error, "Get all blogs error");
    }
  }

  //renderings

  useEffect(() => {
    if (blogid) {
      getSingleBlog();
    }
  }, [blogid]);

  return (
    <div>
      <Navbar onlyTop={true} />
      <div className="flex flex-col gap-4 max-w-screen-xl m-auto pb-16 py-20">
        {localLoading ? (
          <>
            <div className="text-5xl font-bold">
              <div className="h-10 bg-slate-200 rounded col-span-2 w-96"></div>
            </div>
            <div className="font-medium text-gray-500 text-base">
              <div className="h-3 bg-slate-200 rounded col-span-2 w-44"></div>
            </div>
            <div className="mt-6 text-lg font-medium flex flex-col gap-3">
              <div className="h-3 bg-slate-200 rounded col-span-2 w-full"></div>
              <div className="h-3 bg-slate-200 rounded col-span-2 w-full"></div>
              <div className="h-3 bg-slate-200 rounded col-span-2 w-full"></div>
              <div className="h-3 bg-slate-200 rounded col-span-2 w-full"></div>
              <div className="h-3 bg-slate-200 rounded col-span-2 w-full"></div>
              <div className="h-3 bg-slate-200 rounded col-span-2 w-96"></div>
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl font-bold">{eachBlog?.title}</div>
            <div className="font-medium text-gray-500 text-base">
              {eachBlog?.uploadedDate &&
                `Posted in ${moment(eachBlog?.uploadedDate).format(
                  "MMM Do YYYY"
                )}`}
            </div>
            <div className="mt-6 text-lg font-medium">{eachBlog?.content}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
