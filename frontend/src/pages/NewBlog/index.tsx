import { NewArticleNavbar } from "../../components/Navbar";

const NewBlog = () => {
  return (
    <div>
      <NewArticleNavbar />
      <div className="max-w-screen-xl mx-auto flex justify-between w-full px-16 py-10">
        <input
          className="text-5xl border-l border-transparent outline-none pl-4 py-3 focus:border-gray-400"
          type="text"
          placeholder="Tell your story..."
        />
      </div>
    </div>
  );
};

export default NewBlog;
