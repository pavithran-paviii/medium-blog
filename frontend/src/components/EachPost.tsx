import moment from "moment";
import { BlogStructure } from "../pages/Home/home.types";
import { useNavigate } from "react-router-dom";

const EachPost = ({
  title,
  content,
  uploadedDate,
  author,
  id,
}: BlogStructure) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col gap-5 w-full border-b border-gray-200 pb-8 pt-3 px-4 rounded cursor-pointer hover:bg-gray-100"
      onClick={() => navigate(`/${id}`)}
    >
      <div className="flex gap-2">
        <div className="font-semibold border rounded-full h-8 w-8 flex items-center justify-center">
          {author?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="font-normal">{author?.name}</div>
        <div className="flex items-center justify-center h-min">.</div>
        <div className="text-gray-600">
          {moment(uploadedDate).format("MMM Do YYYY")}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold">{title}</div>
        <div className="mt-4 text-lg leading-7 text-gray-600">
          {content ? extractAndTruncateText(content, 30) : ""}
        </div>
      </div>
      <div className="text-gray-600 text-base">5 min read</div>
    </div>
  );
};

export default EachPost;

export const EachPostLoading = () => {
  return (
    <div className="flex flex-col gap-5 w-full border-b border-gray-200 pb-8 pt-3">
      <div className="flex gap-2 items-center">
        <div className="font-semibold border rounded-full h-8 w-8 flex items-center justify-center">
          <div className="rounded-full bg-slate-200 h-8 w-8"></div>
        </div>
        <div className="h-3 w-20 bg-slate-200 rounded col-span-2"></div>
        <div className="h-3 w-24 bg-slate-200 rounded col-span-2"></div>
      </div>
      <div>
        <div className="text-3xl font-bold">
          <div className="h-3 bg-slate-200 rounded col-span-2 w-96"></div>
        </div>
        <div className="mt-4 text-lg leading-7 text-gray-600 flex flex-col gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-2 w-6/12"></div>
        </div>
      </div>
      <div className="text-gray-600 text-bse">
        <div className="h-2 bg-slate-200 rounded col-span-2 w-24"></div>
      </div>
    </div>
  );
};

const extractAndTruncateText = (html: string, wordLimit: number): string => {
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Extract text content
  const textContent = tempDiv.textContent || "";

  // Split text into words and truncate
  const words = textContent.split(/\s+/); // Split by whitespace
  const truncatedWords = words.slice(0, wordLimit).join(" ");

  return truncatedWords;
};
