import moment from "moment";
import { BlogStructure } from "../pages/Home/home.types";

const EachPost = ({ title, content, uploadedDate, author }: BlogStructure) => {
  return (
    <div className="flex flex-col gap-5 w-full border-b border-gray-200 pb-8 pt-3">
      <div className="flex gap-2">
        <div className="font-semibold border rounded-full h-8 w-8 flex items-center justify-center">
          {author?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="font-normal">{author?.name}</div>
        <div className="flex items-center justify-center">.</div>
        <div className="text-gray-600">
          {moment(uploadedDate).format("MMM Do YYYY")}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold">{title}</div>
        <div className="mt-4 text-lg leading-7 text-gray-600">{content}</div>
      </div>
      <div className="text-gray-600 text-bse">5 min read</div>
    </div>
  );
};

export default EachPost;
